from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse
from models.devis_models import DevisRequest, Devis
from services.pricing_service import PricingService
from services.pdf_service import PDFService
from services.communication_service import CommunicationService
from repositories.devis_repository import DevisRepository
import logging
from typing import List, Optional
import io
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["devis"])

@router.post("/generate-devis")
async def generate_devis(
    devis_request: DevisRequest,
    background_tasks: BackgroundTasks
):
    """
    Génération complète d'un devis avec calcul automatique, PDF et envoi
    """
    try:
        logger.info(f"Génération de devis pour le client: {devis_request.client.email}")
        
        # 1. Calcul de la tarification automatique (3€/km)
        pricing_service = PricingService()
        devis_lines = await pricing_service.calculate_devis_pricing(devis_request)
        
        if not devis_lines:
            raise HTTPException(
                status_code=400,
                detail="Impossible de calculer la tarification pour cette demande"
            )
        
        # 2. Création du devis en base de données
        devis = await DevisRepository.create_devis(devis_request)
        
        # 3. Ajout des lignes de devis calculées
        devis.lignes_devis = devis_lines
        
        # Calcul des totaux
        devis.montant_total_ht = sum(line.montant_ht for line in devis_lines)
        devis.montant_total_tva = sum(line.montant_tva for line in devis_lines)
        devis.montant_total_ttc = sum(line.montant_ttc for line in devis_lines)
        
        # 4. Mise à jour du devis avec les montants calculés
        updated_devis = await DevisRepository.update_devis(
            devis.id,
            {
                "lignes_devis": [line.model_dump() for line in devis_lines],
                "montant_total_ht": devis.montant_total_ht,
                "montant_total_tva": devis.montant_total_tva,
                "montant_total_ttc": devis.montant_total_ttc,
                "statut": "genere"
            }
        )
        
        # 5. Génération du PDF et envoi automatique en arrière-plan
        background_tasks.add_task(
            process_devis_communication,
            updated_devis
        )
        
        logger.info(f"Devis généré avec succès: {devis.numero_devis}")
        
        return {
            "success": True,
            "devis_id": devis.id,
            "numero_devis": devis.numero_devis,
            "montant_total_ttc": devis.montant_total_ttc,
            "lignes_devis": [
                {
                    "designation": line.designation,
                    "prix_unitaire_ht": line.prix_unitaire_ht,
                    "quantite": line.quantite,
                    "montant_ttc": line.montant_ttc
                }
                for line in devis_lines
            ],
            "message": "Devis généré avec succès. Le PDF sera envoyé par email et WhatsApp.",
            "pdf_generation": "in_progress"
        }
        
    except Exception as e:
        logger.error(f"Erreur lors de la génération du devis: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la génération du devis: {str(e)}"
        )

async def process_devis_communication(devis: Devis):
    """Traitement en arrière-plan : génération PDF et envoi automatique"""
    try:
        # Génération du PDF
        pdf_service = PDFService()
        pdf_bytes = await pdf_service.generate_devis_pdf(devis)
        
        # Sauvegarde du PDF
        pdf_path = await pdf_service.save_pdf_to_file(devis, pdf_bytes)
        
        # Service de communication
        comm_service = CommunicationService()
        
        # Envoi par email avec PDF en pièce jointe
        email_sent = await comm_service.send_devis_by_email(devis, pdf_bytes)
        
        # Génération du lien WhatsApp
        whatsapp_link = await comm_service.send_whatsapp_notification(devis)
        
        # Notification à l'équipe
        admin_notified = await comm_service.send_admin_notification(devis)
        
        # Mise à jour du statut
        status_updates = {
            "pdf_path": pdf_path,
            "pdf_generated_at": datetime.now(),
            "email_sent": email_sent,
            "whatsapp_link": whatsapp_link,
            "admin_notified": admin_notified,
            "statut": "envoye" if email_sent else "pret"
        }
        
        await DevisRepository.update_devis(devis.id, status_updates)
        
        logger.info(f"Traitement communication terminé pour le devis {devis.numero_devis}")
        
    except Exception as e:
        logger.error(f"Erreur traitement communication devis {devis.numero_devis}: {e}")
        # Mise à jour du statut d'erreur
        await DevisRepository.update_devis(
            devis.id,
            {
                "statut": "erreur_communication",
                "error_message": str(e)
            }
        )

@router.get("/devis/{devis_id}/download")
async def download_devis_pdf(devis_id: str):
    """Téléchargement du PDF d'un devis existant"""
    try:
        # Récupération du devis
        devis = await DevisRepository.get_devis_by_id(devis_id)
        
        if not devis:
            raise HTTPException(status_code=404, detail="Devis non trouvé")
        
        # Génération du PDF
        pdf_service = PDFService()
        pdf_bytes = await pdf_service.generate_devis_pdf(devis)
        
        filename = f"devis_{devis.numero_devis}_{devis.date_emission.strftime('%Y%m%d')}.pdf"
        
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}",
                "Content-Length": str(len(pdf_bytes))
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur téléchargement PDF: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erreur lors du téléchargement du PDF"
        )

@router.get("/devis/{devis_id}/preview")
async def preview_devis_pdf(devis_id: str):
    """Prévisualisation du PDF d'un devis dans le navigateur"""
    try:
        devis = await DevisRepository.get_devis_by_id(devis_id)
        
        if not devis:
            raise HTTPException(status_code=404, detail="Devis non trouvé")
        
        pdf_service = PDFService()
        pdf_bytes = await pdf_service.generate_devis_pdf(devis)
        
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": "inline"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur prévisualisation PDF: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la prévisualisation du PDF"
        )

@router.get("/devis/list")
async def list_devis(
    skip: int = 0,
    limit: int = 10,
    client_email: Optional[str] = None,
    statut: Optional[str] = None
):
    """Liste paginée des devis avec filtres optionnels"""
    try:
        devis_list = await DevisRepository.list_devis(
            skip=skip,
            limit=limit,
            client_email=client_email,
            statut=statut
        )
        
        return {
            "devis": [
                {
                    "id": devis.id,
                    "numero_devis": devis.numero_devis,
                    "date_emission": devis.date_emission.isoformat(),
                    "client_nom": devis.client.nom,
                    "client_email": devis.client.email,
                    "vehicule_info": f"{devis.vehicule.marque} {devis.vehicule.modele}",
                    "montant_total_ttc": devis.montant_total_ttc,
                    "statut": devis.statut
                }
                for devis in devis_list
            ],
            "pagination": {
                "skip": skip,
                "limit": limit,
                "total": len(devis_list)
            }
        }
        
    except Exception as e:
        logger.error(f"Erreur récupération liste devis: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la récupération de la liste des devis"
        )

@router.get("/devis/{devis_id}")
async def get_devis_details(devis_id: str):
    """Récupération des détails complets d'un devis"""
    try:
        devis = await DevisRepository.get_devis_by_id(devis_id)
        
        if not devis:
            raise HTTPException(status_code=404, detail="Devis non trouvé")
        
        return {
            "devis": devis.model_dump(),
            "resume": {
                "numero_devis": devis.numero_devis,
                "date_emission": devis.date_emission.isoformat(),
                "date_validite": devis.date_validite.isoformat(),
                "montant_total_ht": devis.montant_total_ht,
                "montant_total_tva": devis.montant_total_tva,
                "montant_total_ttc": devis.montant_total_ttc,
                "nb_lignes": len(devis.lignes_devis),
                "statut": devis.statut
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur récupération détails devis: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la récupération des détails du devis"
        )

@router.put("/devis/{devis_id}/status")
async def update_devis_status(devis_id: str, new_status: str):
    """Mise à jour du statut d'un devis"""
    valid_statuses = ["brouillon", "genere", "envoye", "accepte", "refuse", "expire", "pret"]
    
    if new_status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Statut invalide. Statuts valides: {', '.join(valid_statuses)}"
        )
    
    try:
        updated_devis = await DevisRepository.update_devis(
            devis_id,
            {
                "statut": new_status,
                "status_updated_at": datetime.now()
            }
        )
        
        if not updated_devis:
            raise HTTPException(status_code=404, detail="Devis non trouvé")
        
        logger.info(f"Statut du devis {updated_devis.numero_devis} mis à jour: {new_status}")
        
        return {
            "success": True,
            "devis_id": devis_id,
            "new_status": new_status,
            "message": f"Statut mis à jour vers '{new_status}'"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur mise à jour statut: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la mise à jour du statut"
        )

@router.get("/devis/health")
async def health_check():
    """Vérification de l'état du service devis"""
    try:
        # Test de la base de données
        from database.devis_db import get_devis_database
        db = get_devis_database()
        await db.command('ping')
        
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "service": "Système de génération de devis automatique",
            "version": "1.0.0"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service temporarily unavailable")