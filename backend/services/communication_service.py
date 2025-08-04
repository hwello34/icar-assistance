import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from models.devis_models import Devis
from config.devis_settings import get_devis_settings
import logging
import urllib.parse
from typing import Optional

logger = logging.getLogger(__name__)

class CommunicationService:
    
    def __init__(self):
        self.settings = get_devis_settings()
    
    async def send_devis_by_email(self, devis: Devis, pdf_bytes: bytes) -> bool:
        """Envoi automatique du devis par email"""
        try:
            # Configuration du serveur SMTP
            server = smtplib.SMTP(self.settings.MAIL_SERVER, self.settings.MAIL_PORT)
            
            if self.settings.MAIL_STARTTLS:
                server.starttls()
            
            # Connexion avec les identifiants
            if self.settings.USE_CREDENTIALS and self.settings.MAIL_PASSWORD:
                server.login(self.settings.MAIL_USERNAME, self.settings.MAIL_PASSWORD)
            
            # Création du message
            msg = MIMEMultipart()
            msg['From'] = f"{self.settings.MAIL_FROM_NAME} <{self.settings.MAIL_FROM}>"
            msg['To'] = devis.client.email
            msg['Subject'] = f"Devis Icar Assistance N° {devis.numero_devis}"
            
            # Corps du message
            html_body = self._create_email_template(devis)
            msg.attach(MIMEText(html_body, 'html', 'utf-8'))
            
            # Pièce jointe PDF
            pdf_attachment = MIMEApplication(pdf_bytes, _subtype='pdf')
            pdf_filename = f"devis_{devis.numero_devis}.pdf"
            pdf_attachment.add_header('Content-Disposition', 'attachment', filename=pdf_filename)
            msg.attach(pdf_attachment)
            
            # Envoi du message
            text = msg.as_string()
            server.sendmail(self.settings.MAIL_FROM, devis.client.email, text)
            server.quit()
            
            logger.info(f"Email envoyé avec succès pour le devis {devis.numero_devis} à {devis.client.email}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de l'email pour le devis {devis.numero_devis}: {e}")
            return False
    
    def _create_email_template(self, devis: Devis) -> str:
        """Création du template email HTML"""
        return f"""
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Devis Icar Assistance</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #0F2D52; color: white; padding: 20px; text-align: center; }}
                .content {{ background: #f9f9f9; padding: 20px; }}
                .footer {{ background: #333; color: white; padding: 10px; text-align: center; }}
                .highlight {{ color: #F39C12; font-weight: bold; }}
                .button {{ background: #F39C12; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚗 Icar Assistance</h1>
                    <p>Votre devis de transport personnalisé</p>
                </div>
                
                <div class="content">
                    <p>Bonjour <strong>{devis.client.nom}</strong>,</p>
                    
                    <p>Nous avons le plaisir de vous adresser votre devis personnalisé pour le transport de votre <strong>{devis.vehicule.type.value} {devis.vehicule.marque} {devis.vehicule.modele}</strong>.</p>
                    
                    <div style="background: white; padding: 15px; border-left: 4px solid #F39C12; margin: 20px 0;">
                        <h3>📋 Détails du devis</h3>
                        <p><strong>Numéro :</strong> <span class="highlight">{devis.numero_devis}</span></p>
                        <p><strong>Montant total TTC :</strong> <span class="highlight">{devis.montant_total_ttc:.2f} €</span></p>
                        <p><strong>Validité :</strong> 30 jours</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-left: 4px solid #0F2D52; margin: 20px 0;">
                        <h3>🚚 Trajet</h3>
                        <p><strong>Enlèvement :</strong> {devis.transport.adresse_enlevement}</p>
                        <p><strong>Destination :</strong> {devis.transport.adresse_destination}</p>
                        <p><strong>Date souhaitée :</strong> {devis.transport.date_enlevement.strftime('%d/%m/%Y')}</p>
                    </div>
                    
                    <p>Le devis détaillé est disponible en pièce jointe de cet email.</p>
                    
                    <p><strong>Pour accepter ce devis ou poser des questions :</strong></p>
                    <p>
                        📞 <strong>Téléphone :</strong> {self.settings.BUSINESS_PHONE}<br>
                        📧 <strong>Email :</strong> {self.settings.MAIL_FROM}<br>
                        💬 <strong>WhatsApp :</strong> <a href="{self._generate_whatsapp_link(devis)}" class="button">Répondre via WhatsApp</a>
                    </p>
                    
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>🏆 Pourquoi choisir Icar Assistance ?</strong></p>
                        <ul>
                            <li>✅ Intervention sous 30 minutes</li>
                            <li>✅ Service 24h/24, 7j/7</li>
                            <li>✅ Équipe professionnelle et à l'écoute</li>
                            <li>✅ Matériel de transport adapté</li>
                        </ul>
                    </div>
                    
                    <p>Nous restons à votre disposition pour toute information complémentaire.</p>
                    
                    <p>Cordialement,<br>
                    <strong>L'équipe Icar Assistance</strong></p>
                </div>
                
                <div class="footer">
                    <p>Icar Assistance - Dépannage et transport 24h/24</p>
                    <p>146 RUE DE LA VALSIERE, 34090 MONTPELLIER</p>
                </div>
            </div>
        </body>
        </html>
        """
    
    def _generate_whatsapp_link(self, devis: Devis) -> str:
        """Génération du lien WhatsApp avec message pré-rempli"""
        base_message = f"""
🚗 *Devis Icar Assistance N° {devis.numero_devis}*

Bonjour,

Je souhaite donner suite à mon devis pour le transport de :
- Véhicule : {devis.vehicule.marque} {devis.vehicule.modele}
- De : {devis.transport.adresse_enlevement}
- Vers : {devis.transport.adresse_destination}
- Montant : {devis.montant_total_ttc:.2f} €

Merci de me recontacter.

Cordialement,
{devis.client.nom}
        """.strip()
        
        # Encodage du message pour l'URL
        encoded_message = urllib.parse.quote(base_message)
        
        # Nettoyage du numéro de téléphone pour WhatsApp
        phone_number = self.settings.BUSINESS_PHONE.replace("+", "").replace(" ", "").replace("-", "").replace(".", "")
        
        return f"{self.settings.WHATSAPP_API_URL}?phone={phone_number}&text={encoded_message}"
    
    async def send_whatsapp_notification(self, devis: Devis) -> str:
        """Génération du lien WhatsApp pour notification client"""
        try:
            whatsapp_link = self._generate_whatsapp_link(devis)
            logger.info(f"Lien WhatsApp généré pour le devis {devis.numero_devis}")
            return whatsapp_link
            
        except Exception as e:
            logger.error(f"Erreur lors de la génération du lien WhatsApp pour le devis {devis.numero_devis}: {e}")
            return ""
    
    async def send_admin_notification(self, devis: Devis) -> bool:
        """Notification à l'équipe de la création d'un nouveau devis"""
        try:
            # Configuration du serveur SMTP
            server = smtplib.SMTP(self.settings.MAIL_SERVER, self.settings.MAIL_PORT)
            
            if self.settings.MAIL_STARTTLS:
                server.starttls()
            
            # Connexion avec les identifiants
            if self.settings.USE_CREDENTIALS and self.settings.MAIL_PASSWORD:
                server.login(self.settings.MAIL_USERNAME, self.settings.MAIL_PASSWORD)
            
            # Création du message de notification admin
            msg = MIMEMultipart()
            msg['From'] = f"Système Devis <{self.settings.MAIL_FROM}>"
            msg['To'] = self.settings.MAIL_FROM
            msg['Subject'] = f"[NOUVEAU DEVIS] {devis.numero_devis} - {devis.client.nom}"
            
            # Corps du message admin
            admin_body = f"""
            <h2>🆕 Nouveau devis généré</h2>
            <p><strong>Numéro :</strong> {devis.numero_devis}</p>
            <p><strong>Client :</strong> {devis.client.nom}</p>
            <p><strong>Email :</strong> {devis.client.email}</p>
            <p><strong>Téléphone :</strong> {devis.client.telephone}</p>
            <p><strong>Véhicule :</strong> {devis.vehicule.marque} {devis.vehicule.modele}</p>
            <p><strong>Trajet :</strong> {devis.transport.adresse_enlevement} → {devis.transport.adresse_destination}</p>
            <p><strong>Montant :</strong> {devis.montant_total_ttc:.2f} € TTC</p>
            <p><strong>Date souhaitée :</strong> {devis.transport.date_enlevement.strftime('%d/%m/%Y')}</p>
            """
            
            msg.attach(MIMEText(admin_body, 'html', 'utf-8'))
            
            # Envoi du message
            text = msg.as_string()
            server.sendmail(self.settings.MAIL_FROM, self.settings.MAIL_FROM, text)
            server.quit()
            
            logger.info(f"Notification admin envoyée pour le devis {devis.numero_devis}")
            return True
            
        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de la notification admin pour le devis {devis.numero_devis}: {e}")
            return False