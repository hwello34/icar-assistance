from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict
from datetime import datetime, date
from enum import Enum

class VehicleType(str, Enum):
    VOITURE = "voiture"
    MOTO = "moto"
    UTILITAIRE = "utilitaire"
    CAMION = "camion"

class TransmissionType(str, Enum):
    MANUELLE = "manuelle"
    AUTOMATIQUE = "automatique"

class VehicleCondition(str, Enum):
    ROULANT = "roulant"
    NON_ROULANT = "non_roulant"
    ACCIDENTE = "accidente"

class ClientInfo(BaseModel):
    nom: str = Field(..., min_length=2, max_length=100)
    telephone: str = Field(..., min_length=10, max_length=15)
    email: EmailStr
    adresse_ligne1: str = Field(..., max_length=200)
    adresse_ligne2: Optional[str] = Field(None, max_length=200)
    code_postal: str = Field(..., min_length=5, max_length=5)
    ville: str = Field(..., max_length=100)

class VehicleInfo(BaseModel):
    type: VehicleType
    marque: str = Field(..., max_length=50)
    modele: str = Field(..., max_length=50)
    plaque: str = Field(..., max_length=20)
    transmission: TransmissionType
    etat: VehicleCondition
    annee: Optional[int] = Field(None, ge=1990, le=2025)
    couleur: Optional[str] = Field(None, max_length=30)

class TransportInfo(BaseModel):
    adresse_enlevement: str = Field(..., max_length=300)
    adresse_destination: str = Field(..., max_length=300)
    date_enlevement: date
    date_livraison_souhaitee: Optional[date] = None
    instructions_speciales: Optional[str] = Field(None, max_length=500)
    distance_km: Optional[float] = Field(None, ge=0)

class QuoteLineItem(BaseModel):
    designation: str
    prix_unitaire_ht: float = Field(..., ge=0)
    quantite: int = Field(..., ge=1)
    taux_tva: float = Field(default=20.0, ge=0, le=100)
    
    @property
    def montant_ht(self) -> float:
        return self.prix_unitaire_ht * self.quantite
    
    @property
    def montant_tva(self) -> float:
        return self.montant_ht * (self.taux_tva / 100)
    
    @property
    def montant_ttc(self) -> float:
        return self.montant_ht + self.montant_tva

class DevisRequest(BaseModel):
    client: ClientInfo
    vehicule: VehicleInfo
    transport: TransportInfo
    details_specifiques: Optional[Dict] = Field(default_factory=dict)

class Devis(BaseModel):
    id: Optional[str] = None
    numero_devis: Optional[str] = None
    date_emission: datetime = Field(default_factory=datetime.now)
    date_validite: datetime
    client: ClientInfo
    vehicule: VehicleInfo
    transport: TransportInfo
    lignes_devis: List[QuoteLineItem] = Field(default_factory=list)
    montant_total_ht: float = Field(default=0.0)
    montant_total_tva: float = Field(default=0.0)
    montant_total_ttc: float = Field(default=0.0)
    statut: str = Field(default="brouillon")
    mode_paiement: str = Field(default="virement")
    conditions_paiement: str = Field(default="30 jours")
    pdf_path: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)