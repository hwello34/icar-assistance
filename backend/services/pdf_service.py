from weasyprint import HTML, CSS
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from models.devis_models import Devis
from config.devis_settings import get_devis_settings
import logging
from typing import Optional
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class PDFService:
    
    def __init__(self):
        self.settings = get_devis_settings()
        self.template_dir = Path(self.settings.PDF_TEMPLATE_DIR)
        self.template_dir.mkdir(parents=True, exist_ok=True)
        
        # Configuration de Jinja2
        self.env = Environment(
            loader=FileSystemLoader(str(self.template_dir)),
            autoescape=select_autoescape(['html', 'xml'])
        )
        
        # Ajout de filtres personnalisés
        self.env.filters['currency'] = self._format_currency
        self.env.filters['date_fr'] = self._format_date_french
        self.env.filters['phone_fr'] = self._format_phone_french

    def _format_currency(self, amount: float) -> str:
        """Formatage des montants en euros avec séparateur français"""
        return f"{amount:,.2f} €".replace(",", " ").replace(".", ",")

    def _format_date_french(self, date_obj: datetime) -> str:
        """Formatage des dates au format français"""
        if isinstance(date_obj, str):
            return date_obj
        months = [
            "janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ]
        return f"{date_obj.day} {months[date_obj.month - 1]} {date_obj.year}"

    def _format_phone_french(self, phone: str) -> str:
        """Formatage des numéros de téléphone français"""
        # Nettoyage du numéro
        clean_phone = ''.join(filter(str.isdigit, phone))
        if clean_phone.startswith('33'):
            clean_phone = '0' + clean_phone[2:]
        elif clean_phone.startswith('+33'):
            clean_phone = '0' + clean_phone[3:]
        
        if len(clean_phone) == 10:
            return '.'.join([clean_phone[i:i+2] for i in range(0, len(clean_phone), 2)])
        return phone

    async def generate_devis_pdf(self, devis: Devis) -> bytes:
        """
        Génération du PDF de devis basé sur le modèle fourni
        """
        try:
            # Calcul des totaux
            total_ht = sum(ligne.montant_ht for ligne in devis.lignes_devis)
            total_tva = sum(ligne.montant_tva for ligne in devis.lignes_devis)
            total_ttc = sum(ligne.montant_ttc for ligne in devis.lignes_devis)
            
            # Mise à jour de l'objet devis avec les totaux
            devis.montant_total_ht = total_ht
            devis.montant_total_tva = total_tva
            devis.montant_total_ttc = total_ttc
            
            # Préparation du contexte pour le template
            context = {
                'devis': devis,
                'company': {
                    'nom': 'Icar Assistance',
                    'slogan': 'Icar Assistance, la route en toute aisance !',
                    'adresse_ligne1': '146 RUE DE LA VALSIERE',
                    'code_postal': '34090',
                    'ville': 'MONTPELLIER',
                    'telephone': '(+33) 07 81 50 55 55',
                    'email': 'autoexpres34@gmail.com'
                },
                'logo_url': self.settings.COMPANY_LOGO_PATH,
                'generation_date': datetime.now()
            }
            
            # Rendu du template HTML
            template = self.env.get_template('devis_template.html')
            html_content = template.render(context)
            
            # Génération du PDF
            html_doc = HTML(string=html_content, base_url=str(self.template_dir))
            css_path = self.template_dir / 'devis_styles.css'
            
            if css_path.exists():
                css_doc = CSS(filename=str(css_path))
                pdf_bytes = html_doc.write_pdf(stylesheets=[css_doc])
            else:
                pdf_bytes = html_doc.write_pdf()
            
            logger.info(f"PDF généré avec succès pour le devis {devis.numero_devis}")
            return pdf_bytes
            
        except Exception as e:
            logger.error(f"Erreur lors de la génération du PDF pour le devis {devis.numero_devis}: {e}")
            raise

    async def save_pdf_to_file(self, devis: Devis, pdf_bytes: bytes) -> str:
        """Sauvegarde du PDF généré dans un fichier"""
        try:
            output_dir = Path(self.settings.PDF_OUTPUT_DIR)
            output_dir.mkdir(parents=True, exist_ok=True)
            
            filename = f"devis_{devis.numero_devis}_{devis.date_emission.strftime('%Y%m%d')}.pdf"
            filepath = output_dir / filename
            
            with open(filepath, 'wb') as f:
                f.write(pdf_bytes)
            
            logger.info(f"PDF sauvegardé: {filepath}")
            return str(filepath)
            
        except Exception as e:
            logger.error(f"Erreur lors de la sauvegarde du PDF: {e}")
            raise