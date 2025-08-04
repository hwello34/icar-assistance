from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
from config.devis_settings import get_devis_settings
import logging

logger = logging.getLogger(__name__)

class DevisDatabase:
    client: AsyncIOMotorClient = None
    database = None

devis_db = DevisDatabase()

async def connect_devis_db():
    """Connexion à MongoDB pour le système de devis"""
    settings = get_devis_settings()
    try:
        devis_db.client = AsyncIOMotorClient(settings.MONGODB_URL)
        devis_db.database = devis_db.client[settings.DATABASE_NAME]
        
        # Test de connexion
        await devis_db.client.admin.command('ping')
        logger.info(f"Connexion réussie à MongoDB devis: {settings.DATABASE_NAME}")
        
        # Création des index
        await create_devis_indexes()
        
    except Exception as e:
        logger.error(f"Erreur de connexion MongoDB devis: {e}")
        raise

async def close_devis_db():
    """Fermeture de la connexion MongoDB devis"""
    if devis_db.client:
        devis_db.client.close()
        logger.info("Connexion MongoDB devis fermée")

async def create_devis_indexes():
    """Création des index pour optimiser les performances"""
    try:
        # Index sur les devis
        await devis_db.database.devis.create_index("numero_devis", unique=True)
        await devis_db.database.devis.create_index("client.email")
        await devis_db.database.devis.create_index("date_emission")
        await devis_db.database.devis.create_index("statut")
        
        # Index sur les compteurs
        await devis_db.database.counters.create_index("_id", unique=True)
        
        logger.info("Index MongoDB devis créés avec succès")
    except Exception as e:
        logger.error(f"Erreur lors de la création des index devis: {e}")

def get_devis_database():
    """Récupération de l'instance de base de données devis"""
    return devis_db.database