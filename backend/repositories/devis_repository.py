from database.devis_db import get_devis_database
from models.devis_models import Devis, DevisRequest
from services.counter_service import CounterService
from datetime import datetime, timedelta
from typing import Optional, List
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)

class DevisRepository:
    
    @staticmethod
    async def create_devis(devis_request: DevisRequest) -> Devis:
        """Création d'un nouveau devis avec numérotation automatique"""
        db = get_devis_database()
        
        try:
            # Génération du numéro de devis
            numero_devis = await CounterService.get_next_devis_number()
            
            # Création de l'objet devis
            devis = Devis(
                numero_devis=numero_devis,
                date_emission=datetime.now(),
                date_validite=datetime.now() + timedelta(days=30),
                client=devis_request.client,
                vehicule=devis_request.vehicule,
                transport=devis_request.transport,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            
            # Conversion en dictionnaire pour MongoDB avec gestion des dates
            devis_dict = devis.model_dump(exclude={"id"}, mode='json')
            
            # Convert string dates back to datetime objects for MongoDB
            from datetime import datetime as dt
            if isinstance(devis_dict['transport']['date_enlevement'], str):
                devis_dict['transport']['date_enlevement'] = dt.fromisoformat(devis_dict['transport']['date_enlevement'])
            
            if devis_dict['transport'].get('date_livraison_souhaitee'):
                if isinstance(devis_dict['transport']['date_livraison_souhaitee'], str):
                    devis_dict['transport']['date_livraison_souhaitee'] = dt.fromisoformat(devis_dict['transport']['date_livraison_souhaitee'])
            
            # Insertion en base
            result = await db.devis.insert_one(devis_dict)
            devis.id = str(result.inserted_id)
            
            logger.info(f"Devis créé avec succès: {numero_devis}")
            return devis
            
        except Exception as e:
            logger.error(f"Erreur lors de la création du devis: {e}")
            raise

    @staticmethod
    async def get_devis_by_id(devis_id: str) -> Optional[Devis]:
        """Récupération d'un devis par son ID"""
        db = get_devis_database()
        
        try:
            result = await db.devis.find_one({"_id": ObjectId(devis_id)})
            if result:
                result["id"] = str(result["_id"])
                del result["_id"]
                return Devis(**result)
            return None
        except Exception as e:
            logger.error(f"Erreur lors de la récupération du devis {devis_id}: {e}")
            return None

    @staticmethod
    async def get_devis_by_number(numero_devis: str) -> Optional[Devis]:
        """Récupération d'un devis par son numéro"""
        db = get_devis_database()
        
        try:
            result = await db.devis.find_one({"numero_devis": numero_devis})
            if result:
                result["id"] = str(result["_id"])
                del result["_id"]
                return Devis(**result)
            return None
        except Exception as e:
            logger.error(f"Erreur lors de la récupération du devis {numero_devis}: {e}")
            return None

    @staticmethod
    async def update_devis(devis_id: str, devis_data: dict) -> Optional[Devis]:
        """Mise à jour d'un devis existant"""
        db = get_devis_database()
        
        try:
            devis_data["updated_at"] = datetime.now()
            
            result = await db.devis.find_one_and_update(
                {"_id": ObjectId(devis_id)},
                {"$set": devis_data},
                return_document=True
            )
            
            if result:
                result["id"] = str(result["_id"])
                del result["_id"]
                return Devis(**result)
            return None
        except Exception as e:
            logger.error(f"Erreur lors de la mise à jour du devis {devis_id}: {e}")
            return None

    @staticmethod
    async def list_devis(
        skip: int = 0, 
        limit: int = 10, 
        client_email: Optional[str] = None,
        statut: Optional[str] = None
    ) -> List[Devis]:
        """Liste paginée des devis avec filtres optionnels"""
        db = get_devis_database()
        
        try:
            filter_dict = {}
            if client_email:
                filter_dict["client.email"] = client_email
            if statut:
                filter_dict["statut"] = statut
            
            cursor = db.devis.find(filter_dict).skip(skip).limit(limit).sort("date_emission", -1)
            devis_list = []
            
            async for doc in cursor:
                doc["id"] = str(doc["_id"])
                del doc["_id"]
                devis_list.append(Devis(**doc))
            
            return devis_list
        except Exception as e:
            logger.error(f"Erreur lors de la récupération de la liste des devis: {e}")
            return []