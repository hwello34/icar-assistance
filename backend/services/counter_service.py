from database.devis_db import get_devis_database
from datetime import datetime
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class CounterService:
    
    @staticmethod
    async def get_next_devis_number() -> str:
        """Génère le prochain numéro de devis de manière atomique"""
        db = get_devis_database()
        current_year = datetime.now().year
        
        # Construction de l'ID du compteur basé sur l'année
        counter_id = f"devis_{current_year}"
        
        try:
            # Opération atomique d'incrémentation
            result = await db.counters.find_one_and_update(
                {"_id": counter_id},
                {"$inc": {"value": 1}},
                upsert=True,
                return_document=True
            )
            
            counter_value = result["value"]
            
            # Formatage du numéro de devis : DEV-2025-00001
            formatted_number = f"DEV-{current_year}-{counter_value:05d}"
            
            logger.info(f"Nouveau numéro de devis généré: {formatted_number}")
            return formatted_number
            
        except Exception as e:
            logger.error(f"Erreur lors de la génération du numéro de devis: {e}")
            raise

    @staticmethod
    async def get_current_counter(year: Optional[int] = None) -> int:
        """Récupère la valeur actuelle du compteur devis sans l'incrémenter"""
        db = get_devis_database()
        current_year = year or datetime.now().year
        
        counter_id = f"devis_{current_year}"
        
        try:
            result = await db.counters.find_one({"_id": counter_id})
            return result["value"] if result else 0
        except Exception as e:
            logger.error(f"Erreur lors de la récupération du compteur devis: {e}")
            return 0

    @staticmethod
    async def reset_counter(year: Optional[int] = None, new_value: int = 0):
        """Remet à zéro un compteur devis (utile pour les tests ou la maintenance)"""
        db = get_devis_database()
        current_year = year or datetime.now().year
        
        counter_id = f"devis_{current_year}"
        
        try:
            await db.counters.update_one(
                {"_id": counter_id},
                {"$set": {"value": new_value}},
                upsert=True
            )
            logger.info(f"Compteur devis {current_year} remis à {new_value}")
        except Exception as e:
            logger.error(f"Erreur lors de la remise à zéro du compteur devis: {e}")
            raise