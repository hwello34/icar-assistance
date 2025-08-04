from pydantic_settings import BaseSettings
from typing import List
import os
from functools import lru_cache

class DevisSettings(BaseSettings):
    # Configuration MongoDB
    MONGODB_URL: str = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DATABASE_NAME: str = "icar_assistance"
    
    # Configuration Email
    MAIL_USERNAME: str = "autoexpres34@gmail.com"
    MAIL_PASSWORD: str = ""  # À configurer via les variables d'environnement
    MAIL_FROM: str = "autoexpres34@gmail.com"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "Icar Assistance"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True
    
    # Configuration CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Configuration PDF
    PDF_TEMPLATE_DIR: str = "/app/backend/templates/pdf"
    PDF_OUTPUT_DIR: str = "/app/backend/generated_pdfs"
    COMPANY_LOGO_PATH: str = "https://customer-assets.emergentagent.com/job_car-help-redesign/artifacts/0s0fuqdj_psd%20Logo%20Icar%20Assitance%207%20%28%20Final%20%29.png"
    
    # Configuration Tarification (3€/km comme demandé)
    BASE_PRICE_PER_KM: float = 3.0
    VEHICLE_TYPE_MULTIPLIERS: dict = {
        "voiture": 1.0,
        "moto": 0.8,
        "utilitaire": 1.2,
        "camion": 1.8
    }
    CONDITION_MULTIPLIERS: dict = {
        "roulant": 1.0,
        "non_roulant": 1.3,
        "accidente": 1.5
    }
    
    # Configuration WhatsApp
    WHATSAPP_API_URL: str = "https://api.whatsapp.com/send"
    BUSINESS_PHONE: str = "+33781505555"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # Ignorer les variables supplémentaires

@lru_cache()
def get_devis_settings():
    return DevisSettings()