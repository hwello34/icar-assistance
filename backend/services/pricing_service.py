from typing import Dict, List, Optional
from models.devis_models import VehicleType, VehicleCondition, TransmissionType, DevisRequest, QuoteLineItem
from config.devis_settings import get_devis_settings
from database.devis_db import get_devis_database
import logging
from datetime import datetime
import re

logger = logging.getLogger(__name__)

class PricingService:
    
    def __init__(self):
        self.settings = get_devis_settings()
        self.luxury_brands = {
            'BMW', 'MERCEDES', 'MERCEDES-BENZ', 'AUDI', 'LEXUS', 'PORSCHE', 
            'JAGUAR', 'BENTLEY', 'ROLLS-ROYCE', 'FERRARI', 'LAMBORGHINI',
            'MASERATI', 'ASTON MARTIN', 'TESLA'
        }
    
    def _is_weekend_or_holiday(self, date_transport) -> bool:
        """Vérification si la date correspond à un weekend ou jour férié"""
        return date_transport.weekday() >= 5  # Samedi = 5, Dimanche = 6
    
    def _is_urgent_transport(self, date_transport) -> bool:
        """Vérification si le transport est urgent (moins de 24h)"""
        from datetime import datetime, timedelta
        return date_transport <= datetime.now().date() + timedelta(days=1)
    
    def _is_luxury_vehicle(self, marque: str) -> bool:
        """Vérification si le véhicule est de luxe"""
        return marque.upper() in self.luxury_brands
    
    async def calculate_devis_pricing(self, devis_request: DevisRequest) -> List[QuoteLineItem]:
        """
        Calcul des lignes de devis avec tarification automatique
        Prix de base : 3€/km comme demandé
        """
        try:
            lines = []
            
            # 1. Calcul du prix de base du transport
            base_price = await self._calculate_base_transport_price(devis_request)
            if base_price > 0:
                lines.append(QuoteLineItem(
                    designation=f"Transport {devis_request.vehicule.type.value.title()} - {devis_request.vehicule.marque} {devis_request.vehicule.modele}",
                    prix_unitaire_ht=base_price,
                    quantite=1,
                    taux_tva=20.0
                ))
            
            # 2. Application des majorations selon l'état du véhicule
            state_surcharge = await self._calculate_state_surcharge(devis_request, base_price)
            if state_surcharge > 0:
                lines.append(QuoteLineItem(
                    designation=f"Majoration véhicule {devis_request.vehicule.etat.value.replace('_', ' ')}",
                    prix_unitaire_ht=state_surcharge,
                    quantite=1,
                    taux_tva=20.0
                ))
            
            # 3. Ajout des services additionnels applicables
            additional_lines = await self._calculate_additional_services(devis_request)
            lines.extend(additional_lines)
            
            # 4. Application des remises de volume si applicable
            volume_discount = await self._calculate_volume_discount(devis_request, lines)
            if volume_discount < 0:  # Remise = montant négatif
                lines.append(QuoteLineItem(
                    designation="Remise fidélité client",
                    prix_unitaire_ht=volume_discount,
                    quantite=1,
                    taux_tva=20.0
                ))
            
            logger.info(f"Tarification calculée: {len(lines)} lignes pour un montant total HT de {sum(line.montant_ht for line in lines):.2f}€")
            return lines
            
        except Exception as e:
            logger.error(f"Erreur lors du calcul de la tarification: {e}")
            raise
    
    async def _calculate_base_transport_price(self, devis_request: DevisRequest) -> float:
        """Calcul du prix de base du transport avec 3€/km"""
        try:
            # Prix de base par km : 3€ comme demandé
            base_rate_per_km = self.settings.BASE_PRICE_PER_KM  # 3.0
            
            # Application du multiplicateur selon le type de véhicule
            vehicle_multiplier = self.settings.VEHICLE_TYPE_MULTIPLIERS.get(
                devis_request.vehicule.type.value, 1.0
            )
            
            # Distance par défaut si non spécifiée (estimation simple)
            distance = devis_request.transport.distance_km or await self._estimate_distance(
                devis_request.transport.adresse_enlevement,
                devis_request.transport.adresse_destination
            )
            
            # Calcul du prix de base
            base_price = distance * base_rate_per_km * vehicle_multiplier
            
            # Prix minimum selon le type de véhicule
            minimum_prices = {
                VehicleType.VOITURE: 120.0,  # Minimum ajusté pour 3€/km
                VehicleType.MOTO: 90.0,
                VehicleType.UTILITAIRE: 150.0,
                VehicleType.CAMION: 200.0
            }
            
            minimum_price = minimum_prices.get(devis_request.vehicule.type, 120.0)
            
            return max(base_price, minimum_price)
            
        except Exception as e:
            logger.error(f"Erreur calcul prix de base: {e}")
            return 0.0
    
    async def _calculate_state_surcharge(self, devis_request: DevisRequest, base_price: float) -> float:
        """Calcul de la majoration selon l'état du véhicule"""
        try:
            condition_multiplier = self.settings.CONDITION_MULTIPLIERS.get(
                devis_request.vehicule.etat.value, 1.0
            )
            
            if condition_multiplier > 1.0:
                return base_price * (condition_multiplier - 1.0)
            
            return 0.0
            
        except Exception as e:
            logger.error(f"Erreur calcul majoration état: {e}")
            return 0.0
    
    async def _calculate_additional_services(self, devis_request: DevisRequest) -> List[QuoteLineItem]:
        """Calcul des services additionnels applicables"""
        additional_lines = []
        
        try:
            # Service weekend/férié
            if self._is_weekend_or_holiday(devis_request.transport.date_enlevement):
                additional_lines.append(QuoteLineItem(
                    designation="Majoration weekend/jours fériés",
                    prix_unitaire_ht=75.0,  # Ajusté pour 3€/km
                    quantite=1,
                    taux_tva=20.0
                ))
            
            # Transport urgent
            if self._is_urgent_transport(devis_request.transport.date_enlevement):
                additional_lines.append(QuoteLineItem(
                    designation="Transport urgent (moins de 24h)",
                    prix_unitaire_ht=100.0,  # Ajusté pour 3€/km
                    quantite=1,
                    taux_tva=20.0
                ))
            
            # Véhicule de luxe
            if self._is_luxury_vehicle(devis_request.vehicule.marque):
                additional_lines.append(QuoteLineItem(
                    designation="Majoration véhicule de luxe",
                    prix_unitaire_ht=150.0,  # Ajusté pour 3€/km
                    quantite=1,
                    taux_tva=20.0
                ))
            
            # Assurance complémentaire si demandée
            if devis_request.details_specifiques.get("assurance_complementaire", False):
                additional_lines.append(QuoteLineItem(
                    designation="Assurance complémentaire",
                    prix_unitaire_ht=40.0,
                    quantite=1,
                    taux_tva=20.0
                ))
            
            return additional_lines
            
        except Exception as e:
            logger.error(f"Erreur calcul services additionnels: {e}")
            return []
    
    async def _calculate_volume_discount(self, devis_request: DevisRequest, current_lines: List[QuoteLineItem]) -> float:
        """Calcul des remises selon l'historique client"""
        try:
            # Récupération de l'historique client
            db = get_devis_database()
            client_history = await db.devis.count_documents({
                "client.email": devis_request.client.email,
                "statut": "accepte"
            })
            
            total_ht = sum(line.montant_ht for line in current_lines)
            
            # Barème de remises
            if client_history >= 10:  # Client fidèle
                return -total_ht * 0.10  # 10% de remise
            elif client_history >= 5:  # Client régulier
                return -total_ht * 0.05  # 5% de remise
            elif total_ht > 500:  # Commande importante
                return -total_ht * 0.03  # 3% de remise
            
            return 0.0
            
        except Exception as e:
            logger.error(f"Erreur calcul remise volume: {e}")
            return 0.0
    
    async def _estimate_distance(self, origin: str, destination: str) -> float:
        """Estimation simplifiée de la distance entre deux adresses"""
        try:
            # Estimation approximative basée sur la longueur des adresses
            # En production, utiliser une API de géolocalisation (Google Maps, etc.)
            estimated_distance = min(abs(len(origin) - len(destination)) * 3, 800)
            return max(estimated_distance, 15)  # Distance minimum de 15km
            
        except Exception as e:
            logger.error(f"Erreur estimation distance: {e}")
            return 50  # Distance par défaut