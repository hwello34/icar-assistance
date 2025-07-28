import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Clock, 
  MapPin, 
  Car, 
  Truck, 
  Wrench, 
  Battery, 
  Settings,
  Shield,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  Navigation,
  AlertCircle,
  Globe,
  Mail,
  Instagram,
  Facebook
} from "lucide-react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    vehicleType: '',
    model: '',
    brand: '',
    licensePlate: '',
    fourWheelDrive: '',
    breakdown: '',
    gearbox: '',
    pickupAddress: '',
    dropoffLocation: '',
    pickupDate: '',
    fullName: '',
    phone: '',
    email: '',
    details: ''
  });

  // Système de traductions
  const translations = {
    fr: {
      // Navigation
      services: "Services",
      quote: "Devis",
      about: "À propos",
      testimonials: "Témoignages",
      contact: "Contact",
      emergency: "Service d'urgence 24h/24",
      emergencyCall: "Appel d'urgence",
      freeQuote: "Devis Gratuit",
      whatsappGps: "WhatsApp + GPS",
      locating: "Localisation...",
      
      // Hero Section
      heroTitle: "Icar Assistance",
      heroSubtitle: "Pour un dépannage en toute confiance, appelez Icar Assistance !",
      heroDescription: "Depuis <strong>plus de 15 ans</strong>, <strong>Icar Assistance</strong> est le spécialiste du dépannage et du remorquage automobile à <strong>Montpellier et dans sa métropole</strong>. Disponible 7J/24H et doté d'une flotte de véhicules et matériels performants, notre équipe intervient <strong>rapidement, efficacement et en toute sécurité</strong>, quelle que soit la situation. Nous proposons <strong>un service complet</strong>, allant de l'assistance en cas de panne au dépannage, en passant par le remorquage longue distance en France ou à l'étranger (Espagne, Italie, Allemagne…). Notre savoir-faire, notre réactivité et notre sens du service font d'<strong>Icar Assistance un allié de confiance</strong> pour les particuliers comme pour les professionnels. Avec nous, pas de mauvaise surprise : vous êtes <strong>entre de bonnes mains</strong>, du premier appel jusqu'à la remise en route de votre véhicule.",
      intervention30min: "Intervention sous 30min",
      gpsLocation: "Localisation GPS",
      guarantee: "Professionnel et à l'écoute",
      
      // Services
      servicesTitle: "Nos Services Experts",
      servicesSubtitle: "Dépannage automobile, transport et services techniques complets sur Montpellier",
      
      autoRepair: "Dépannage Automobile",
      autoRepairDesc: "Notre priorité : vous faire repartir rapidement et en toute sérénité.",
      completeDiagnostic: "Diagnostic de panne",
      onSiteRepair: "Dépannage sur place si possible",
      allBrands: "Vous orienter vers la meilleure solution",
      
      vehicleTowing: "Remorquage Véhicules",
      vehicleTowingDesc: "Service professionnel 24H/7J pour tout type de véhicule léger ou utilitaire",
      equippedTowTrucks: "Dépanneuses équipées",
      secureTransport: "Vous accompagner jusqu'au garage ou lieu de votre choix",
      allVehicleTypes: "Intervention sur véhicule immobilisé ou accidenté: En ville, sur route ou en zone difficile d'accès",
      
      batteryService: "Dépannage Batterie",
      batteryServiceDesc: "Batterie à plat ou hors service ? Intervention rapide et fiable, pour éviter l'immobilisation de votre véhicule",
      emergencyStart: "Test complet batterie, alternateur et fusibles",
      onSiteReplacement: "Aide au démarrage d'urgence",
      qualityBatteries: "Remplacement si nécessaire",
      
      tireService: "Service Pneumatique",
      tireServiceDesc: "Crevaison ou pneu endommagé ? Intervention sur route ou à domicile.",
      mountingDismounting: "Remplacement immédiat",
      spareWheel: "Réparation crevaison",
      punctureRepair: "Transport vers une centrale pneu",

      // Specialized Services
      specializedBreakdown: "Dépannage Spécialisé",
      undergroundParking: "Parking Sous-Sol & Barrières",
      undergroundParkingDesc: "Votre voiture est bloquée dans un parking souterrain ou à hauteur inferieur à 2 mètres ? Grâce à nos 4X4 paniers et notre expérience, nous pouvons sortir votre véhicule jusqu'à la destination souhaitée.",
      utilityVehicles: "Véhicules Utilitaires",
      utilityVehiclesDesc: "Besoin de dépanner un véhicule utilitaire ou professionnel ? Icar Assistance prend en charge les dépannages et remorquages de fourgons toutes tailles, camions bennes, camping-car, engins Btp et Agricoles en respectant vos contraintes de temps et d'activité.",
      motoTransport: "Transport Moto/Scooter",
      motoTransportDesc: "Votre moto , scooter ou Quad en panne ? Nous assurons  un  transport sécurisé , qu'il s'agisse d'une intervention locale ou d'un transfert long distance.",

      // Technical Services
      technicalServices: "Services Techniques",
      autoLocksmith: "Serrurerie Auto",
      autoLocksmithDesc: "Clé cassée, perdue ou verrouillage accidentel du véhicule ? Nous intervenons rapidement pour ouvrir votre portière voiture sans l'endommager, et si besoin, nous aidons à trouver une solution de reprogrammation ou reproduction de clef.",
      impoundRecovery: "Sortie de Fourrière",
      impoundRecoveryDesc: "Votre véhicule a été placé en fourrière ? Nous facilitons toutes les démarches administratives et sortons votre voiture dès obtention de l'autorisation afin de vous éviter tracas, perte de temps et frais de gardiennage.",
      ditchRecovery: "Sortie de Fossé/Ravin",
      ditchRecoveryDesc: "Votre véhicule est sorti de route ? Nos engins de remorquage puissants nous permettent de sortir les voitures embourbées, tombées dans un fossé ou sur le bas-côté, avec le plus grand soin pour préserver la mécanique.",

      // Transport & Removal
      transportRemoval: "Transport & Enlèvement",
      scrapRemoval: "Enlèvement Épave",
      scrapRemovalDesc: "Votre véhicule est hors d'usage (VHU)? Notre service d'enlèvement d'épaves est agréé et gratuit. Nous intervenons rapidement et prenons en charge l'enlèvement et  les démarches administratives afin de débarrasser votre véhicule en toute légalité.",
      portTransport: "Transport Port/Bateau",
      portTransportDesc: "Votre voiture tombe en panne alors que vous deviez embarquer sur un ferry ? Pas de panique. Nous organisons son transport jusqu'au port ou terminal pour qu'elle puisse prendre le bateau comme prévu, sans compromettre votre voyage.",
      longDistanceTransport: "Transport Longue Distance",
      longDistanceTransportDesc: "Icar Assistance propose le transport longue distance de véhicules sur l'ensemble de la France et vers les pays frontaliers. Un service sûr et soigné pour particuliers ou professionnels, que ce soit pour un convoyage, un achat ou un besoin exceptionnel.",

      // Why Choose Us
      whyChooseTitle: "Pourquoi Choisir",
      whyChooseSubtitle: "Icar Assistance",
      rapidIntervention: "Rapidité d'intervention",
      rapidInterventionDesc: "Nos équipes interviennent dans les 30 minutes suivant votre appel sur Montpellier.",
      technicalExpertise: "Expertise technique",
      technicalExpertiseDesc: "Techniciens certifiés avec plus de 10 ans d'expérience en dépannage.",
      transparentPricing: "Tarifs transparents",
      transparentPricingDesc: "Devis gratuit et sans engagement. Pas de frais cachés.",
      montpellierCoverage: "Couverture Montpellier Métropole",
      montpellierCoverageDesc: "Service disponible sur Montpellier et toutes les communes de la métropole.",

      // Testimonials
      testimonialsTitle: "Ils parlent de Nous",
      testimonialsSubtitle: "Chaque jour, plus de clients satisfaits",
      
      // FAQ
      faqTitle: "Questions Fréquentes",
      question1: "Intervenez-vous 24h/24 et 7j/7 sur Montpellier ?",
      answer1: "Oui, nous assurons un service d'urgence 24h/24 et 7j/7 pour tous vos besoins de dépannage automobile et moto sur Montpellier et sa métropole.",
      
      question2: "Comment fonctionne la géolocalisation WhatsApp ?",
      answer2: "Cliquez sur le bouton 'WhatsApp + GPS', autorisez la géolocalisation, et votre position exacte sera automatiquement envoyée via WhatsApp avec un lien Google Maps pour nous permettre de vous localiser instantanément.",
      
      question3: "Quels sont vos délais d'intervention sur Montpellier ?",
      answer3: "Nos équipes interviennent en moyenne dans les 30 minutes suivant votre appel, selon votre localisation sur Montpellier Métropole. Avec la géolocalisation, nous pouvons vous trouver encore plus rapidement.",
      
      question4: "Quels types de véhicules pouvez-vous dépanner ?",
      answer4: "Nous dépannons tous types de véhicules : voitures, motos, scooters, véhicules utilitaires, fourgons, bennes, camping-cars, caravanes, véhicules agricoles et BTP. Nous intervenons même dans les parkings sous-sol avec barrières basses.",
      
      question5: "Comment laisser un avis sur nos services ?",
      answer5: "Vous pouvez laisser un avis en scannant le QR code dans la section témoignages de notre site, ou directement via notre page Google Business. Votre retour nous aide à améliorer continuellement nos services de dépannage.",

      // Quote Form
      quoteTitle: "Demandez Votre Devis Gratuit",
      quoteSubtitle: "Obtenez rapidement un devis personnalisé pour votre dépannage ou transport",
      getQuote: "Obtenir mon devis",
      freeQuoteNoCommitment: "Devis gratuit et sans engagement",
      
      vehicleInfo: "Informations Véhicule",
      vehicleType: "Type de véhicule",
      selectVehicleType: "Sélectionnez le type",
      car: "Voiture",
      motorcycle: "Moto",
      utility: "Utilitaire",
      
      brand: "Marque",
      enterBrand: "Saisissez la marque",
      model: "Modèle",
      enterModel: "Saisissez le modèle",
      licensePlate: "Plaque d'immatriculation",
      enterLicensePlate: "Saisissez la plaque",
      
      vehicleStatus: "État du véhicule",
      breakdown: "Panne",
      accident: "Accidenté",
      
      wheels: "Roues",
      freeWheels: "Roue libre",
      blockedWheels: "Roue bloquée",
      
      gearbox: "Boîte de vitesse",
      manual: "Manuelle",
      automatic: "Automatique",
      
      transportInfo: "Informations Transport",
      pickupAddress: "Adresse d'enlèvement",
      enterPickupAddress: "Saisissez l'adresse complète",
      dropoffAddress: "Lieu de dépôt",
      enterDropoffAddress: "Saisissez le lieu de dépôt",
      pickupDate: "Date d'enlèvement",
      
      contactInfo: "Vos Coordonnées",
      fullName: "Nom Prénom",
      enterFullName: "Saisissez votre nom complet",
      phone: "Téléphone",
      enterPhone: "Saisissez votre numéro",
      email: "Email",
      enterEmail: "Saisissez votre email",
      
      additionalDetails: "Précisions complémentaires",
      enterDetails: "Décrivez votre situation...",
      
      // WhatsApp Messages
      whatsappTitle: "Envoyez Votre Position via WhatsApp",
      whatsappSubtitle: "Partagez instantanément votre localisation GPS précise via WhatsApp. Nos équipes vous localisent en quelques secondes partout sur Montpellier !",
      
      step1: "Cliquez sur le bouton",
      step1Desc: "Autorisez la géolocalisation sur votre téléphone",
      step2: "Position automatique",
      step2Desc: "Votre position GPS est ajoutée automatiquement",
      step3: "Envoi instantané",
      step3Desc: "Votre demande arrive directement chez nous",
      
      sendMyLocation: "Envoyer ma position",
      whatsappWithoutGps: "WhatsApp sans GPS",
      locationSharedExclusively: "Votre position est partagée uniquement avec Icar Assistance pour le dépannage",
      
      // Footer
      quickLinks: "Liens Rapides",
      serviceZones: "Zones",
      montpellierCenter: "Montpellier Centre",
      castelnauLeLez: "Castelnau-le-Lez",
      lattes: "Lattes - Pérols",
      saintJeanDeVedas: "Saint-Jean-de-Védas",
      juvignacGrabels: "Juvignac - Grabels",
      
      ourServices: "Nos Services",
      autoMotoBreakdown: "Dépannage Auto/Moto",
      specializedTowing: "Remorquage Spécialisé",
      longDistanceTransport: "Transport Longue Distance",
      autoLocksmithService: "Serrurerie Automobile",
      scrapRemovalService: "Enlèvement Épave",
      tireServiceFooter: "Service Pneus",
      
      contactInfo: "Contact",
      whatsappWithGps: "WhatsApp avec GPS",
      contactEmail: "autoexpres34@gmail.com",
      freeQuoteText: "Devis gratuit",
      
      footerTagline: "Votre spécialiste du dépannage automobile, intervention rapide et adaptée sur Montpellier Métropole",
      allRightsReserved: "© 2025 Icar Assistance Montpellier. Tous droits réservés.",
      legalMentions: "Mentions légales",
      confidentialityPolicy: "Politique de confidentialité",

      // Testimonials Data
      testimonial1Name: "Marie Dubois",
      testimonial1Location: "Montpellier Centre",
      testimonial1Text: "Service impeccable ! Ils sont arrivés en 20 minutes près de la Place de la Comédie et ont résolu ma panne rapidement. Je recommande vivement Icar Assistance.",
      
      testimonial2Name: "Jean Martinez", 
      testimonial2Location: "Castelnau-le-Lez",
      testimonial2Text: "Ma moto est tombée en panne sur la rocade. Professionnels et réactifs, ils ont été là en un temps record avec une dépanneuse adaptée.",
      
      testimonial3Name: "Sophie Laurent",
      testimonial3Location: "Lattes",
      testimonial3Text: "Batterie à plat devant Odysseum. Tarifs transparents et service de qualité. Ils ont changé ma batterie en quelques minutes seulement.",

      // CTA Section
      needSpecializedService: "Besoin d'un Service Spécialisé ?",
      situationDescription: "Quelle que soit votre situation de dépannage sur Montpellier, Notre équipe professionnelle et expérimentée a la solution.",
      immediateQuote: "Devis Immédiat",
      gpsLocation: "Localisation GPS",

      // Experience Section  
      shareYourExperience: "Vous Aussi, Partagez Votre Expérience",
      reviewHelpsImprove: "Votre avis compte ! Aidez d'autres clients en partageant votre expérience avec Icar Assistance.",
      
      // Footer
      quickLinks: "Liens Rapides",
      serviceZones: "Zones",
      contactInfo: "Contact",
      whatsappWithGps: "WhatsApp avec GPS",
      freeQuoteText: "Devis gratuit",
      followUs: "Suivez-nous",
      instagramTooltip: "Instagram @autoexpres34",
      facebookTooltip: "Facebook Icar Assistance",
      snapchatTooltip: "Snapchat hwello07"
    },
    
    en: {
      // Navigation
      services: "Services",
      quote: "Quote",
      about: "About",
      testimonials: "Testimonials",
      contact: "Contact",
      emergency: "24/7 Emergency Service",
      emergencyCall: "Emergency Call",
      freeQuote: "Free Quote",
      whatsappGps: "WhatsApp + GPS",
      locating: "Locating...",
      
      // Hero Section
      heroTitle: "Icar Assistance",
      heroSubtitle: "For confident breakdown assistance, call Icar Assistance!",
      heroDescription: "For <strong>more than 15 years</strong>, <strong>Icar Assistance</strong> has been the specialist in automotive breakdown and towing services in <strong>Montpellier and its metropolitan area</strong>. Available 7 days a week, 24 hours a day, and equipped with a fleet of high-performance vehicles and equipment, our team intervenes <strong>quickly, efficiently and safely</strong>, whatever the situation. We offer <strong>a complete service</strong>, ranging from assistance in case of breakdown to recovery, including long-distance towing in France or abroad (Spain, Italy, Germany...). Our expertise, responsiveness and sense of service make <strong>Icar Assistance a trusted ally</strong> for individuals and professionals alike. With us, no unpleasant surprises: you are <strong>in good hands</strong>, from the first call to getting your vehicle back on the road.",
      intervention30min: "Intervention within 30min",
      gpsLocation: "GPS Location",
      guarantee: "Professional and attentive",
      
      // Services
      servicesTitle: "Our Expert Services",
      servicesSubtitle: "Automotive breakdown, transport and complete technical services in Montpellier",
      
      autoRepair: "Automotive Breakdown",
      autoRepairDesc: "Rapid intervention for all light vehicles",
      completeDiagnostic: "Complete diagnostic",
      onSiteRepair: "On-site repair",
      allBrands: "All brand vehicles",
      
      vehicleTowing: "Vehicle Towing",
      vehicleTowingDesc: "Professional 24/7 towing service",
      equippedTowTrucks: "Equipped tow trucks",
      secureTransport: "Secure transport",
      allVehicleTypes: "All vehicle types",
      
      batteryService: "Battery Service",
      batteryServiceDesc: "Jump start and battery replacement",
      emergencyStart: "Emergency start",
      onSiteReplacement: "On-site replacement",
      qualityBatteries: "Quality batteries",
      
      tireService: "Tire Service",
      tireServiceDesc: "Roadside and home tire intervention",
      mountingDismounting: "Mounting/dismounting",
      spareWheel: "Spare wheel",
      punctureRepair: "Puncture repair",

      // Specialized Services
      specializedBreakdown: "Specialized Breakdown",
      undergroundParking: "Underground Parking & Barriers",
      undergroundParkingDesc: "Parking breakdown with barrier < 2m",
      utilityVehicles: "Utility Vehicles",
      utilityVehiclesDesc: "Van, truck, motorhome, caravan, agricultural, construction",
      motoTransport: "Motorcycle/Scooter Transport",
      motoTransportDesc: "Two-wheel breakdown and transport",

      // Technical Services
      technicalServices: "Technical Services",
      autoLocksmith: "Auto Locksmith",
      autoLocksmithDesc: "Door opening, car key reproduction",
      impoundRecovery: "Impound Recovery",
      impoundRecoveryDesc: "Vehicle recovery from impound lot",
      ditchRecovery: "Ditch/Ravine Recovery",
      ditchRecoveryDesc: "Accident vehicle recovery",

      // Transport & Removal
      transportRemoval: "Transport & Removal",
      scrapRemoval: "Scrap Removal",
      scrapRemovalDesc: "End-of-life vehicle removal service",
      portTransport: "Port/Boat Transport",
      portTransportDesc: "Vehicle transport and loading",
      longDistanceTransport: "Long Distance Transport",
      longDistanceTransportDesc: "Transport any distance France/Europe",

      // Why Choose Us
      whyChooseTitle: "Why Choose",
      whyChooseSubtitle: "Icar Assistance",
      rapidIntervention: "Rapid intervention",
      rapidInterventionDesc: "Our teams intervene within 30 minutes of your call in Montpellier.",
      technicalExpertise: "Technical expertise",
      technicalExpertiseDesc: "Certified technicians with over 10 years of breakdown experience.",
      transparentPricing: "Transparent pricing",
      transparentPricingDesc: "Free quote with no commitment. No hidden fees.",
      montpellierCoverage: "Montpellier Metropolitan Coverage",
      montpellierCoverageDesc: "Service available in Montpellier and all metropolitan municipalities.",

      // Testimonials
      testimonialsTitle: "They talk about Us",
      testimonialsSubtitle: "Every day, more satisfied customers",
      
      // FAQ
      faqTitle: "Frequently Asked Questions",
      question1: "Do you operate 24/7 in Montpellier?",
      answer1: "Yes, we provide 24/7 emergency service for all your automotive and motorcycle breakdown needs in Montpellier and its metropolitan area.",
      
      question2: "How does WhatsApp geolocation work?",
      answer2: "Click the 'WhatsApp + GPS' button, allow geolocation, and your exact position will be automatically sent via WhatsApp with a Google Maps link to help us locate you instantly.",
      
      question3: "What are your response times in Montpellier?",
      answer3: "Our teams respond on average within 30 minutes of your call, depending on your location in Montpellier Metropolitan area. With geolocation, we can find you even faster.",
      
      question4: "What types of vehicles can you assist?",
      answer4: "We assist all types of vehicles: cars, motorcycles, scooters, utility vehicles, vans, trucks, motorhomes, caravans, agricultural and construction vehicles. We even intervene in underground parking with low barriers.",
      
      question5: "How to leave a review of our services?",
      answer5: "You can leave a review by scanning the QR code in the testimonials section of our site, or directly via our Google Business page. Your feedback helps us continuously improve our breakdown services.",

      // Quote Form
      quoteTitle: "Request Your Free Quote",
      quoteSubtitle: "Get a personalized quote quickly for your breakdown or transport",
      getQuote: "Get my quote",
      freeQuoteNoCommitment: "Free quote with no commitment",
      
      vehicleInfo: "Vehicle Information",
      vehicleType: "Vehicle type",
      selectVehicleType: "Select type",
      car: "Car",
      motorcycle: "Motorcycle",
      utility: "Utility vehicle",
      
      brand: "Brand",
      enterBrand: "Enter brand",
      model: "Model", 
      enterModel: "Enter model",
      licensePlate: "License plate",
      enterLicensePlate: "Enter license plate",
      
      vehicleStatus: "Vehicle status",
      breakdown: "Breakdown",
      accident: "Accident",
      
      wheels: "Wheels",
      freeWheels: "Free wheels",
      blockedWheels: "Blocked wheels",
      
      gearbox: "Gearbox",
      manual: "Manual",
      automatic: "Automatic",
      
      transportInfo: "Transport Information",
      pickupAddress: "Pickup address",
      enterPickupAddress: "Enter complete address",
      dropoffAddress: "Drop-off location",
      enterDropoffAddress: "Enter drop-off location",
      pickupDate: "Pickup date",
      
      contactInfo: "Your Contact Information",
      fullName: "Full Name",
      enterFullName: "Enter your full name",
      phone: "Phone",
      enterPhone: "Enter your number",
      email: "Email",
      enterEmail: "Enter your email",
      
      additionalDetails: "Additional details",
      enterDetails: "Describe your situation...",
      
      // WhatsApp Messages
      whatsappTitle: "Send Your Location via WhatsApp",
      whatsappSubtitle: "Instantly share your precise GPS location via WhatsApp. Our teams locate you in seconds anywhere in Montpellier!",
      
      step1: "Click the button",
      step1Desc: "Allow geolocation on your phone",
      step2: "Automatic position",
      step2Desc: "Your GPS position is added automatically",
      step3: "Instant send",
      step3Desc: "Your request arrives directly to us",
      
      sendMyLocation: "Send my location",
      whatsappWithoutGps: "WhatsApp without GPS",
      locationSharedExclusively: "Your location is shared exclusively with Icar Assistance for breakdown assistance",
      
      // Footer
      quickLinks: "Quick Links",
      serviceZones: "Zones",
      montpellierCenter: "Montpellier Center",
      castelnauLeLez: "Castelnau-le-Lez",
      lattes: "Lattes - Pérols",
      saintJeanDeVedas: "Saint-Jean-de-Védas",
      juvignacGrabels: "Juvignac - Grabels",
      
      ourServices: "Our Services",
      autoMotoBreakdown: "Auto/Motorcycle Breakdown",
      specializedTowing: "Specialized Towing",
      longDistanceTransport: "Long Distance Transport",
      autoLocksmithService: "Auto Locksmith",
      scrapRemovalService: "Scrap Removal",
      tireServiceFooter: "Tire Service",
      
      contactInfo: "Contact",
      whatsappWithGps: "WhatsApp with GPS",
      contactEmail: "autoexpres34@gmail.com",
      freeQuoteText: "Free quote",
      
      footerTagline: "Your automotive breakdown specialist, rapid and adapted intervention in Montpellier Metropolitan area",
      allRightsReserved: "© 2025 Icar Assistance Montpellier. All rights reserved.",
      legalMentions: "Legal mentions",
      confidentialityPolicy: "Privacy policy",

      // Testimonials Data
      testimonial1Name: "Marie Dubois",
      testimonial1Location: "Montpellier Center",
      testimonial1Text: "Impeccable service! They arrived in 20 minutes near Place de la Comédie and resolved my breakdown quickly. I highly recommend Icar Assistance.",
      
      testimonial2Name: "Jean Martinez",
      testimonial2Location: "Castelnau-le-Lez", 
      testimonial2Text: "My motorcycle broke down on the ring road. Professional and responsive, they were there in record time with an adapted tow truck.",
      
      testimonial3Name: "Sophie Laurent",
      testimonial3Location: "Lattes",
      testimonial3Text: "Dead battery in front of Odysseum. Transparent pricing and quality service. They changed my battery in just a few minutes.",

      // CTA Section
      needSpecializedService: "Need a Specialized Service?",
      situationDescription: "Whatever your breakdown situation in Montpellier, our experts have the solution.",
      immediateQuote: "Immediate Quote",
      gpsLocation: "GPS Location",

      // Experience Section
      shareYourExperience: "You Too, Share Your Experience", 
      reviewHelpsImprove: "Your opinion matters! Help other customers by sharing your experience with Icar Assistance.",
      
      // Footer
      quickLinks: "Quick Links",
      serviceZones: "Zones",
      contactInfo: "Contact",
      whatsappWithGps: "WhatsApp with GPS",
      freeQuoteText: "Free quote",
      followUs: "Follow Us",
      instagramTooltip: "Instagram @autoexpres34",
      facebookTooltip: "Facebook Icar Assistance",
      snapchatTooltip: "Snapchat hwello07"
    },
    
    es: {
      // Navigation
      services: "Servicios",
      quote: "Presupuesto",
      about: "Acerca de",
      testimonials: "Testimonios",
      contact: "Contacto",
      emergency: "Servicio de emergencia 24h/24",
      emergencyCall: "Llamada de emergencia",
      freeQuote: "Presupuesto Gratuito",
      whatsappGps: "WhatsApp + GPS",
      locating: "Localizando...",
      
      // Hero Section
      heroTitle: "Icar Assistance",
      heroSubtitle: "¡Para una asistencia en carretera con total confianza, llame a Icar Assistance!",
      heroDescription: "Desde <strong>más de 15 años</strong>, <strong>Icar Assistance</strong> es el especialista en averías y remolque de automóviles en <strong>Montpellier y su área metropolitana</strong>. Disponible 7 días a la semana, 24 horas al día, y equipado con una flota de vehículos y equipos de alto rendimiento, nuestro equipo interviene <strong>rápida, eficaz y seguramente</strong>, cualquiera que sea la situación. Ofrecemos <strong>un servicio completo</strong>, desde la asistencia en caso de avería hasta la grúa, pasando por el remolque de larga distancia en Francia o en el extranjero (España, Italia, Alemania...). Nuestra experiencia, capacidad de respuesta y sentido del servicio hacen de <strong>Icar Assistance un aliado de confianza</strong> tanto para particulares como para profesionales. Con nosotros, no hay sorpresas desagradables: usted está <strong>en buenas manos</strong>, desde la primera llamada hasta la puesta en marcha de su vehículo.",
      intervention30min: "Intervención en 30min",
      gpsLocation: "Localización GPS",
      guarantee: "Profesional y atento",
      
      // Services
      servicesTitle: "Nuestros Servicios Expertos",
      servicesSubtitle: "Asistencia automotriz, transporte y servicios técnicos completos en Montpellier",
      
      autoRepair: "Asistencia Automotriz",
      autoRepairDesc: "Intervención rápida para todos los vehículos ligeros",
      completeDiagnostic: "Diagnóstico completo",
      onSiteRepair: "Reparación en el lugar",
      allBrands: "Vehículos de todas las marcas",
      
      vehicleTowing: "Remolque de Vehículos",
      vehicleTowingDesc: "Servicio de remolque profesional 24h/24",
      equippedTowTrucks: "Grúas equipadas",
      secureTransport: "Transporte seguro",
      allVehicleTypes: "Todos los tipos de vehículos",
      
      batteryService: "Servicio de Batería",
      batteryServiceDesc: "Arranque y reemplazo de batería",
      emergencyStart: "Arranque de emergencia",
      onSiteReplacement: "Reemplazo en el lugar",
      qualityBatteries: "Baterías de calidad",
      
      tireService: "Servicio de Neumáticos",
      tireServiceDesc: "Intervención de neumáticos en carretera y domicilio",
      mountingDismounting: "Montaje/desmontaje",
      spareWheel: "Rueda de repuesto",
      punctureRepair: "Reparación de pinchazos",

      // Specialized Services
      specializedBreakdown: "Asistencia Especializada",
      undergroundParking: "Parking Subterráneo y Barreras",
      undergroundParkingDesc: "Asistencia en parking con barrera < 2m",
      utilityVehicles: "Vehículos Utilitarios",
      utilityVehiclesDesc: "Furgoneta, camión, autocaravana, caravana, agrícola, construcción",
      motoTransport: "Transporte Moto/Scooter",
      motoTransportDesc: "Asistencia y transporte de dos ruedas",

      // Technical Services
      technicalServices: "Servicios Técnicos",
      autoLocksmith: "Cerrajería Auto",
      autoLocksmithDesc: "Apertura de puertas, reproducción de llaves",
      impoundRecovery: "Recuperación de Depósito",
      impoundRecoveryDesc: "Recuperación de vehículo del depósito",
      ditchRecovery: "Recuperación de Zanja/Barranco",
      ditchRecoveryDesc: "Recuperación de vehículo accidentado",

      // Transport & Removal
      transportRemoval: "Transporte y Retirada",
      scrapRemoval: "Retirada de Chatarra",
      scrapRemovalDesc: "Servicio de retirada de vehículo fuera de uso",
      portTransport: "Transporte Puerto/Barco",
      portTransportDesc: "Transporte y embarque de vehículo",
      longDistanceTransport: "Transporte Larga Distancia",
      longDistanceTransportDesc: "Transporte cualquier distancia Francia/Europa",

      // Why Choose Us
      whyChooseTitle: "Por Qué Elegir",
      whyChooseSubtitle: "Icar Assistance",
      rapidIntervention: "Intervención rápida",
      rapidInterventionDesc: "Nuestros equipos intervienen en 30 minutos después de su llamada en Montpellier.",
      technicalExpertise: "Experiencia técnica",
      technicalExpertiseDesc: "Técnicos certificados con más de 10 años de experiencia en asistencia.",
      transparentPricing: "Precios transparentes",
      transparentPricingDesc: "Presupuesto gratuito y sin compromiso. Sin tarifas ocultas.",
      montpellierCoverage: "Cobertura Área Metropolitana Montpellier",
      montpellierCoverageDesc: "Servicio disponible en Montpellier y todos los municipios metropolitanos.",

      // Testimonials
      testimonialsTitle: "Hablan de Nosotros",
      testimonialsSubtitle: "Cada día, más clientes satisfechos",
      
      // FAQ
      question1: "¿Operan 24h/24 y 7j/7 en Montpellier?",
      answer1: "Sí, proporcionamos servicio de emergencia 24h/24 y 7j/7 para todas sus necesidades de asistencia automotriz y de motocicletas en Montpellier y su área metropolitana.",
      
      question2: "¿Cómo funciona la geolocalización de WhatsApp?",
      answer2: "Haga clic en el botón 'WhatsApp + GPS', permita la geolocalización, y su posición exacta será enviada automáticamente vía WhatsApp con un enlace de Google Maps para ayudarnos a localizarle instantáneamente.",
      
      // Footer
      quickLinks: "Enlaces Rápidos",
      serviceZones: "Zonas",
      contactInfo: "Contacto",
      whatsappWithGps: "WhatsApp con GPS",
      freeQuoteText: "Presupuesto gratuito",
      followUs: "Síguenos",
      instagramTooltip: "Instagram @autoexpres34",
      facebookTooltip: "Facebook Icar Assistance",
      snapchatTooltip: "Snapchat hwello07"
    },
    
    it: {
      // Navigation
      services: "Servizi",
      quote: "Preventivo",
      about: "Chi siamo",
      testimonials: "Testimonianze",
      contact: "Contatto",
      emergency: "Servizio di emergenza 24h/24",
      emergencyCall: "Chiamata di emergenza",
      freeQuote: "Preventivo Gratuito",
      whatsappGps: "WhatsApp + GPS",
      locating: "Localizzazione...",
      
      // Hero Section
      heroTitle: "Icar Assistance",
      heroSubtitle: "Per un'assistenza stradale senza stress, chiama Icar Assistance!",
      heroDescription: "Da <strong>più di 15 anni</strong>, <strong>Icar Assistance</strong> è lo specialista del soccorso stradale e del traino automobilistico a <strong>Montpellier e nella sua area metropolitana</strong>. Disponibile 7 giorni su 7, 24 ore su 24, e dotato di una flotta di veicoli e attrezzature ad alte prestazioni, il nostro team interviene <strong>rapidamente, efficacemente e in totale sicurezza</strong>, qualunque sia la situazione. Offriamo <strong>un servizio completo</strong>, dall'assistenza in caso di guasto al soccorso, passando per il traino a lunga distanza in Francia o all'estero (Spagna, Italia, Germania...). La nostra competenza, reattività e senso del servizio rendono <strong>Icar Assistance un alleato di fiducia</strong> sia per i privati che per i professionisti. Con noi, nessuna brutta sorpresa: siete <strong>in buone mani</strong>, dalla prima chiamata fino alla rimessa in strada del vostro veicolo.",
      intervention30min: "Intervento entro 30min",
      gpsLocation: "Localizzazione GPS",
      guarantee: "Professionale e attento",
      
      // Services
      servicesTitle: "I Nostri Servizi Esperti",
      servicesSubtitle: "Assistenza automobilistica, trasporto e servizi tecnici completi a Montpellier",
      
      autoRepair: "Assistenza Automobilistica",
      autoRepairDesc: "Intervento rapido per tutti i veicoli leggeri",
      completeDiagnostic: "Diagnosi completa",
      onSiteRepair: "Riparazione sul posto",
      allBrands: "Veicoli di tutte le marche",
      
      vehicleTowing: "Rimorchio Veicoli",
      vehicleTowingDesc: "Servizio di rimorchio professionale 24h/24",
      equippedTowTrucks: "Carri attrezzi attrezzati",
      secureTransport: "Trasporto sicuro",
      allVehicleTypes: "Tutti i tipi di veicoli",
      
      batteryService: "Servizio Batteria",
      batteryServiceDesc: "Avviamento e sostituzione batteria",
      emergencyStart: "Avviamento di emergenza",
      onSiteReplacement: "Sostituzione sul posto",
      qualityBatteries: "Batterie di qualità",
      
      tireService: "Servizio Pneumatici",
      tireServiceDesc: "Intervento pneumatici strada e domicilio",
      mountingDismounting: "Montaggio/smontaggio",
      spareWheel: "Ruota di scorta",
      punctureRepair: "Riparazione foratura",

      // Specialized Services
      specializedBreakdown: "Assistenza Specializzata",
      undergroundParking: "Parcheggio Sotterraneo e Barriere",
      undergroundParkingDesc: "Assistenza parcheggio con barriera < 2m",
      utilityVehicles: "Veicoli Commerciali",
      utilityVehiclesDesc: "Furgone, camion, camper, caravan, agricolo, edilizia",
      motoTransport: "Trasporto Moto/Scooter",
      motoTransportDesc: "Assistenza e trasporto due ruote",

      // Technical Services
      technicalServices: "Servizi Tecnici",
      autoLocksmith: "Fabbro Auto",
      autoLocksmithDesc: "Apertura portiere, riproduzione chiavi auto",
      impoundRecovery: "Recupero da Deposito",
      impoundRecoveryDesc: "Recupero veicolo dal deposito giudiziario",
      ditchRecovery: "Recupero da Fosso/Burrone",
      ditchRecoveryDesc: "Recupero veicolo incidentato",

      // Transport & Removal
      transportRemoval: "Trasporto e Rimozione",
      scrapRemoval: "Rimozione Rottami",
      scrapRemovalDesc: "Servizio rimozione veicolo fuori uso",
      portTransport: "Trasporto Porto/Nave",
      portTransportDesc: "Trasporto e imbarco veicolo",
      longDistanceTransport: "Trasporto Lunga Distanza",
      longDistanceTransportDesc: "Trasporto qualsiasi distanza Francia/Europa",

      // Why Choose Us
      whyChooseTitle: "Perché Scegliere",
      whyChooseSubtitle: "Icar Assistance",
      rapidIntervention: "Intervento rapido",
      rapidInterventionDesc: "Le nostre squadre intervengono entro 30 minuti dalla vostra chiamata a Montpellier.",
      technicalExpertise: "Competenza tecnica",
      technicalExpertiseDesc: "Tecnici certificati con oltre 10 anni di esperienza nell'assistenza.",
      transparentPricing: "Prezzi trasparenti",
      transparentPricingDesc: "Preventivo gratuito e senza impegno. Nessun costo nascosto.",
      montpellierCoverage: "Copertura Area Metropolitana Montpellier",
      montpellierCoverageDesc: "Servizio disponibile a Montpellier e in tutti i comuni metropolitani.",

      // Testimonials
      testimonialsTitle: "Parlano di Noi",
      testimonialsSubtitle: "Ogni giorno, più clienti soddisfatti",
      
      // FAQ
      question1: "Operate 24h/24 e 7g/7 a Montpellier?",
      answer1: "Sì, forniamo servizio di emergenza 24h/24 e 7g/7 per tutte le vostre esigenze di assistenza automobilistica e motociclistica a Montpellier e nella sua area metropolitana.",
      
      question2: "Come funziona la geolocalizzazione WhatsApp?",
      answer2: "Clicca sul pulsante 'WhatsApp + GPS', consenti la geolocalizzazione, e la tua posizione esatta sarà inviata automaticamente via WhatsApp con un link Google Maps per aiutarci a localizzarti istantaneamente.",
      
      // Footer
      quickLinks: "Link Rapidi",
      serviceZones: "Zone",
      contactInfo: "Contatto",
      whatsappWithGps: "WhatsApp con GPS",
      freeQuoteText: "Preventivo gratuito",
      followUs: "Seguici",
      instagramTooltip: "Instagram @autoexpres34",
      facebookTooltip: "Facebook Icar Assistance",
      snapchatTooltip: "Snapchat hwello07"
    },
    
    ar: {
      // Navigation
      services: "الخدمات",
      quote: "عرض سعر",
      about: "من نحن",
      testimonials: "الشهادات",
      contact: "اتصل بنا",
      emergency: "خدمة طوارئ 24/7",
      emergencyCall: "مكالمة طوارئ",
      freeQuote: "عرض سعر مجاني",
      whatsappGps: "واتساب + GPS",
      locating: "تحديد الموقع...",
      
      // Hero Section
      heroTitle: "آيكار أسيستانس",
      heroSubtitle: "للحصول على مساعدة على الطريق بدون إجهاد، اتصل بآيكار أسيستانس!",
      heroDescription: "منذ <strong>أكثر من 15 عاماً</strong>، تُعتبر <strong>آيكار أسيستانس</strong> الخبيرة المختصة في إصلاح الأعطال وسحب السيارات في <strong>مونبلييه ومنطقتها الحضرية</strong>. متاحة 7 أيام في الأسبوع، 24 ساعة في اليوم، ومجهزة بأسطول من المركبات والمعدات عالية الأداء، يتدخل فريقنا <strong>بسرعة وفعالية وبأمان تام</strong>، مهما كانت الحالة. نحن نقدم <strong>خدمة شاملة</strong>، تتراوح من المساعدة في حالة العطل إلى الإنقاذ، مروراً بالسحب لمسافات طويلة في فرنسا أو في الخارج (إسبانيا، إيطاليا، ألمانيا...). خبرتنا وسرعة استجابتنا وحس الخدمة لدينا يجعل من <strong>آيكار أسيستانس حليفاً موثوقاً</strong> للأفراد والمهنيين على حد سواء. معنا، لا توجد مفاجآت سيئة: أنتم <strong>في أيد أمينة</strong>، من أول مكالمة حتى إعادة تشغيل مركبتكم.",
      intervention30min: "تدخل خلال 30 دقيقة",
      gpsLocation: "موقع GPS",
      guarantee: "مهني ومتجاوب",
      
      // Services
      servicesTitle: "خدماتنا المتخصصة",
      servicesSubtitle: "مساعدة السيارات والنقل والخدمات التقنية الشاملة في مونبلييه",
      
      autoRepair: "مساعدة السيارات",
      autoRepairDesc: "تدخل سريع لجميع المركبات الخفيفة",
      completeDiagnostic: "تشخيص شامل",
      onSiteRepair: "إصلاح في الموقع",
      allBrands: "مركبات جميع الماركات",
      
      vehicleTowing: "سحب المركبات",
      vehicleTowingDesc: "خدمة سحب مهنية 24/7",
      equippedTowTrucks: "شاحنات سحب مجهزة",
      secureTransport: "نقل آمن",
      allVehicleTypes: "جميع أنواع المركبات",
      
      batteryService: "خدمة البطارية",
      batteryServiceDesc: "تشغيل واستبدال البطارية",
      emergencyStart: "تشغيل طوارئ",
      onSiteReplacement: "استبدال في الموقع",
      qualityBatteries: "بطاريات عالية الجودة",
      
      tireService: "خدمة الإطارات",
      tireServiceDesc: "تدخل الإطارات على الطريق والمنزل",
      mountingDismounting: "تركيب/فك",
      spareWheel: "عجلة احتياطية",
      punctureRepair: "إصلاح الثقب",

      // Specialized Services
      specializedBreakdown: "مساعدة متخصصة",
      undergroundParking: "مواقف تحت الأرض والحواجز",
      undergroundParkingDesc: "مساعدة مواقف مع حاجز < 2م",
      utilityVehicles: "المركبات التجارية",
      utilityVehiclesDesc: "شاحنة، قلاب، بيت متنقل، مقطورة، زراعي، بناء",
      motoTransport: "نقل الدراجة النارية/السكوتر",
      motoTransportDesc: "مساعدة ونقل ذوات العجلتين",

      // Technical Services
      technicalServices: "الخدمات التقنية",
      autoLocksmith: "صانع أقفال السيارات",
      autoLocksmithDesc: "فتح الأبواب، تكرار مفاتيح السيارة",
      impoundRecovery: "استرداد من المصادرة",
      impoundRecoveryDesc: "استرداد المركبة من ساحة المصادرة",
      ditchRecovery: "استرداد من الخندق/الوادي",
      ditchRecoveryDesc: "استرداد المركبة المتضررة",

      // Transport & Removal
      transportRemoval: "النقل والإزالة",
      scrapRemoval: "إزالة الخردة",
      scrapRemovalDesc: "خدمة إزالة المركبة خارج الخدمة",
      portTransport: "نقل الميناء/القارب",
      portTransportDesc: "نقل وشحن المركبة",
      longDistanceTransport: "النقل لمسافات طويلة",
      longDistanceTransportDesc: "نقل أي مسافة فرنسا/أوروبا",

      // Why Choose Us
      whyChooseTitle: "لماذا تختار",
      whyChooseSubtitle: "آيكار أسيستانس",
      rapidIntervention: "تدخل سريع",
      rapidInterventionDesc: "فرقنا تتدخل خلال 30 دقيقة من مكالمتك في مونبلييه.",
      technicalExpertise: "خبرة تقنية",
      technicalExpertiseDesc: "فنيون معتمدون مع أكثر من 10 سنوات خبرة في المساعدة.",
      transparentPricing: "أسعار شفافة",
      transparentPricingDesc: "عرض سعر مجاني وبدون التزام. لا توجد رسوم مخفية.",
      montpellierCoverage: "تغطية منطقة مونبلييه الحضرية",
      montpellierCoverageDesc: "الخدمة متاحة في مونبلييه وجميع البلديات الحضرية.",

      // Testimonials
      testimonialsTitle: "يتحدثون عنا",
      testimonialsSubtitle: "كل يوم، المزيد من العملاء الراضين",
      
      // FAQ
      question1: "هل تعملون 24/7 في مونبلييه؟",
      answer1: "نعم، نوفر خدمة طوارئ 24/7 لجميع احتياجاتكم من مساعدة السيارات والدراجات النارية في مونبلييه ومنطقتها الحضرية.",
      
      question2: "كيف يعمل تحديد الموقع عبر واتساب؟",
      answer2: "انقر على زر 'واتساب + GPS'، اسمح بتحديد الموقع، وسيتم إرسال موقعك الدقيق تلقائياً عبر واتساب مع رابط خرائط جوجل لمساعدتنا في تحديد موقعك فوراً.",
      
      // Footer
      quickLinks: "روابط سريعة",
      serviceZones: "المناطق",
      contactInfo: "اتصل بنا",
      whatsappWithGps: "واتساب مع GPS",
      freeQuoteText: "عرض سعر مجاني",
      followUs: "تابعنا",
      instagramTooltip: "Instagram @autoexpres34",
      facebookTooltip: "Facebook Icar Assistance",
      snapchatTooltip: "Snapchat hwello07"
    },
    
    de: {
      // Navigation
      services: "Dienstleistungen",
      quote: "Angebot",
      about: "Über uns",
      testimonials: "Referenzen",
      contact: "Kontakt",
      emergency: "24/7 Notdienst",
      emergencyCall: "Notruf",
      freeQuote: "Kostenloses Angebot",
      whatsappGps: "WhatsApp + GPS",
      locating: "Ortung...",
      
      // Hero Section
      heroTitle: "Icar Assistance",
      heroSubtitle: "Für stressfreie Pannenhilfe rufen Sie Icar Assistance an!",
      heroDescription: "Seit <strong>mehr als 15 Jahren</strong> ist <strong>Icar Assistance</strong> der Spezialist für Autopannen und Abschleppdienste in <strong>Montpellier und seiner Metropolregion</strong>. Verfügbar 7 Tage die Woche, 24 Stunden am Tag, und ausgerüstet mit einer Flotte von Hochleistungsfahrzeugen und -ausrüstung, greift unser Team <strong>schnell, effizient und sicher</strong> ein, unabhängig von der Situation. Wir bieten <strong>einen kompletten Service</strong>, von der Pannenhilfe bis zur Bergung und dem Fernabschleppen in Frankreich oder im Ausland (Spanien, Italien, Deutschland...). Unser Fachwissen, unsere Reaktionsfähigkeit und unser Servicegedanke machen <strong>Icar Assistance zu einem vertrauenswürdigen Partner</strong> für Privatpersonen und Unternehmen gleichermaßen. Bei uns gibt es keine bösen Überraschungen: Sie sind <strong>in guten Händen</strong>, vom ersten Anruf bis zur Wiederin betriebnahme Ihres Fahrzeugs.",
      intervention30min: "Eingriff innerhalb 30min",
      gpsLocation: "GPS-Standort",
      guarantee: "Professionell und aufmerksam",
      
      // Services
      servicesTitle: "Unsere Expertendienstleistungen",
      servicesSubtitle: "Autopannenhilfe, Transport und umfassende technische Dienstleistungen in Montpellier",
      
      autoRepair: "Autopannenhilfe",
      autoRepairDesc: "Schneller Eingriff für alle Leichtfahrzeuge",
      completeDiagnostic: "Vollständige Diagnose",
      onSiteRepair: "Reparatur vor Ort",
      allBrands: "Fahrzeuge aller Marken",
      
      vehicleTowing: "Fahrzeugabschleppdienst",
      vehicleTowingDesc: "Professioneller 24/7 Abschleppdienst",
      equippedTowTrucks: "Ausgestattete Abschleppwagen",
      secureTransport: "Sicherer Transport",
      allVehicleTypes: "Alle Fahrzeugtypen",
      
      batteryService: "Batteriedienst",
      batteryServiceDesc: "Starthilfe und Batteriewechsel",
      emergencyStart: "Notstarthilfe",
      onSiteReplacement: "Austausch vor Ort",
      qualityBatteries: "Qualitätsbatterien",
      
      tireService: "Reifendienst",
      tireServiceDesc: "Reifen-Intervention Straße und Zuhause",
      mountingDismounting: "Montage/Demontage",
      spareWheel: "Ersatzrad",
      punctureRepair: "Reifenreparatur",

      // Specialized Services
      specializedBreakdown: "Spezialisierte Pannenhilfe",
      undergroundParking: "Tiefgarage & Schranken",
      undergroundParkingDesc: "Pannenhilfe Parkhaus mit Schranke < 2m",
      utilityVehicles: "Nutzfahrzeuge",
      utilityVehiclesDesc: "Transporter, LKW, Wohnmobil, Wohnwagen, Landwirtschaft, Bau",
      motoTransport: "Motorrad/Roller Transport",
      motoTransportDesc: "Pannenhilfe und Transport Zweiräder",

      // Technical Services
      technicalServices: "Technische Dienste",
      autoLocksmith: "Auto-Schlüsseldienst",
      autoLocksmithDesc: "Türöffnung, Autoschlüssel-Reproduktion",
      impoundRecovery: "Abholung vom Abstellplatz",
      impoundRecoveryDesc: "Fahrzeugabholung vom Abstellplatz",
      ditchRecovery: "Graben/Schlucht Bergung",
      ditchRecoveryDesc: "Verunfalltes Fahrzeug bergen",

      // Transport & Removal
      transportRemoval: "Transport & Entsorgung",
      scrapRemoval: "Schrottentsorgung",
      scrapRemovalDesc: "Altfahrzeug-Entsorgungsservice",
      portTransport: "Hafen/Boot Transport",
      portTransportDesc: "Fahrzeugtransport und Verladung",
      longDistanceTransport: "Fernverkehr",
      longDistanceTransportDesc: "Transport jede Entfernung Frankreich/Europa",

      // Why Choose Us
      whyChooseTitle: "Warum",
      whyChooseSubtitle: "Icar Assistance Wählen",
      rapidIntervention: "Schnelle Intervention",
      rapidInterventionDesc: "Unsere Teams greifen innerhalb von 30 Minuten nach Ihrem Anruf in Montpellier ein.",
      technicalExpertise: "Technische Kompetenz",
      technicalExpertiseDesc: "Zertifizierte Techniker mit über 10 Jahren Pannenhilfe-Erfahrung.",
      transparentPricing: "Transparente Preise",
      transparentPricingDesc: "Kostenloses Angebot ohne Verpflichtung. Keine versteckten Gebühren.",
      montpellierCoverage: "Montpellier Großraum Abdeckung",
      montpellierCoverageDesc: "Service verfügbar in Montpellier und allen Großraumgemeinden.",

      // Testimonials
      testimonialsTitle: "Sie sprechen über Uns",
      testimonialsSubtitle: "Jeden Tag, mehr zufriedene Kunden",
      
      // FAQ
      question1: "Arbeiten Sie 24/7 in Montpellier?",
      answer1: "Ja, wir bieten 24/7 Notdienst für alle Ihre Auto- und Motorrad-Pannenhilfe-Bedürfnisse in Montpellier und seinem Großraum.",
      
      question2: "Wie funktioniert die WhatsApp-Geolokalisierung?",
      answer2: "Klicken Sie auf den 'WhatsApp + GPS' Button, erlauben Sie die Geolokalisierung, und Ihre genaue Position wird automatisch über WhatsApp mit einem Google Maps Link gesendet, um uns zu helfen, Sie sofort zu lokalisieren.",
      
      // Footer
      quickLinks: "Schnelllinks",
      serviceZones: "Zonen",
      contactInfo: "Kontakt",
      whatsappWithGps: "WhatsApp mit GPS",
      freeQuoteText: "Kostenloses Angebot",
      followUs: "Folgen Sie uns",
      instagramTooltip: "Instagram @autoexpres34",
      facebookTooltip: "Facebook Icar Assistance",
      snapchatTooltip: "Snapchat hwello07"
    }
  };

  // Langues disponibles avec drapeaux
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Fermer le dropdown de langue quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-selector')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Récupération de la langue depuis localStorage au montage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('icarassistanceLanguage');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Fonction pour changer de langue
  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('icarassistanceLanguage', langCode);
    setIsLanguageDropdownOpen(false);
  };

  // Fonction pour obtenir le texte traduit
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.fr[key] || key;
  };

  const handleQuoteFormChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Créer le message WhatsApp avec toutes les informations
    const message = `🚗 DEMANDE DE DEVIS ICAR ASSISTANCE 🚗%0A%0A` +
      `👤 CONTACT:%0A` +
      `Nom Prénom: ${quoteForm.fullName}%0A` +
      `Téléphone: ${quoteForm.phone}%0A` +
      `Email: ${quoteForm.email}%0A%0A` +
      `🚙 VÉHICULE:%0A` +
      `Type: ${quoteForm.vehicleType}%0A` +
      `Marque: ${quoteForm.brand}%0A` +
      `Modèle: ${quoteForm.model}%0A` +
      `Plaque: ${quoteForm.licensePlate}%0A` +
      `Roues: ${quoteForm.fourWheelDrive}%0A` +
      `Boîte de vitesse: ${quoteForm.gearbox}%0A` +
      `État: ${quoteForm.breakdown}%0A%0A` +
      `📍 TRANSPORT:%0A` +
      `Enlèvement: ${quoteForm.pickupAddress}%0A` +
      `Dépôt: ${quoteForm.dropoffLocation}%0A` +
      `Date: ${quoteForm.pickupDate}%0A%0A` +
      `📝 PRÉCISIONS:%0A${quoteForm.details}%0A%0A` +
      `Merci de me faire parvenir votre devis !`;
    
    const whatsappUrl = `https://wa.me/33781505555?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Réinitialiser le formulaire
    setQuoteForm({
      vehicleType: '', model: '', brand: '', licensePlate: '', fourWheelDrive: '',
      breakdown: '', gearbox: '', pickupAddress: '', dropoffLocation: '', pickupDate: '',
      fullName: '', phone: '', email: '', details: ''
    });
    setShowQuoteForm(false);
  };

  // Fonction pour obtenir la géolocalisation
  const getLocation = () => {
    setLocationStatus('loading');
    
    if (!navigator.geolocation) {
      setLocationStatus('error');
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setLocationStatus('success');
        
        // Créer le message WhatsApp avec la localisation
        const message = `🚨 URGENCE DÉPANNAGE 🚨%0A%0ABonjour Icar Assistance,%0A%0AJ'ai besoin d'une intervention de dépannage.%0A%0A📍 Ma position exacte :%0ALatitude: ${latitude}%0ALongitude: ${longitude}%0A%0A🔗 Lien Google Maps: https://www.google.com/maps?q=${latitude},${longitude}%0A%0AMerci d'intervenir rapidement !`;
        
        const whatsappUrl = `https://wa.me/33781505555?text=${message}`;
        window.open(whatsappUrl, '_blank');
      },
      (error) => {
        setLocationStatus('error');
        let errorMessage = '';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Vous avez refusé l\'accès à votre position. Veuillez autoriser la géolocalisation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Impossible d\'obtenir votre position actuelle.';
            break;
          case error.TIMEOUT:
            errorMessage = 'La demande de géolocalisation a expiré.';
            break;
          default:
            errorMessage = 'Une erreur inconnue s\'est produite.';
            break;
        }
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Fonction WhatsApp sans géolocalisation
  const sendWhatsAppMessage = () => {
    const message = `🚨 URGENCE DÉPANNAGE 🚨%0A%0ABonjour Icar Assistance,%0A%0AJ'ai besoin d'une intervention de dépannage.%0A%0AJe vous communique ma position par message.%0A%0AMerci d'intervenir rapidement !`;
    const whatsappUrl = `https://wa.me/33781505555?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Images du slideshow - 10 images au total (BB9 supprimée)
  const slideshowImages = [
    {
      url: "https://i.ibb.co/bg2CsymH/BB1.jpg",
      alt: "Icar Assistance - Dépannage professionnel"
    },
    {
      url: "https://i.ibb.co/Qv3w8BrS/BB3.jpg",
      alt: "Icar Assistance - Service de qualité"
    },
    {
      url: "https://i.ibb.co/QF5pghjr/BB18.jpg",
      alt: "Icar Assistance - Matériel professionnel"
    },
    {
      url: "https://i.ibb.co/pr5Jh9Dz/BB22.jpg",
      alt: "Icar Assistance - Service 24h/24"
    },
    {
      url: "https://i.ibb.co/bD3WdGG/Slide-Show-1.jpg",
      alt: "Icar Assistance - Services professionnels"
    },
    {
      url: "https://i.ibb.co/xtR5bn08/zone-intervention-au-lieu-de-l-a.png",
      alt: "Icar Assistance - Zone d'intervention Montpellier"
    },
    {
      url: "https://i.ibb.co/gMTJYVRt/Slide-Show-4.jpg",
      alt: "Icar Assistance - Service premium"
    },
    {
      url: "https://i.ibb.co/v6C4fs0s/F-transport-moto.jpg",
      alt: "Icar Assistance - Transport moto/scooter"
    },
    {
      url: "https://i.ibb.co/BKtkyqM4/a6eaea80-3ecc-45ee-8406-cfabb89e.jpg",
      alt: "Icar Assistance - Expertise technique"
    },
    {
      url: "https://i.ibb.co/Z18N7syr/Whats-App-Image-2025-07-13-23-5.jpg",
      alt: "Icar Assistance - Service spécialisé"
    }
  ];

  // Témoignages Array - Déclaré avant les useEffect pour éviter l'erreur de hoisting
  const testimonials = [
    {
      name: "Marie Dubois",
      location: "Montpellier Centre",
      text: "Service impeccable ! Ils sont arrivés en 20 minutes près de la Place de la Comédie et ont résolu ma panne rapidement. Je recommande vivement Icar Assistance.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c4e0e3e2"
    },
    {
      name: "Ahmed Ben Ali",
      location: "Castelnau-le-Lez",
      text: "Ma voiture est tombée en panne sur la rocade un vendredi soir. L'équipe d'Icar Assistance a été très professionnelle et respectueuse. Service rapide et efficace.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Sophie Laurent",
      location: "Lattes",
      text: "Batterie à plat devant Odysseum. Tarifs transparents et service de qualité. Ils ont changé ma batterie en quelques minutes seulement.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      name: "Kwame Asante",
      location: "Saint-Jean-de-Védas",
      text: "Excellent service ! L'équipe est arrivée rapidement pour ma panne de direction assistée. Personnel compétent et très sympathique. Je recommande !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Emma Rousseau",
      location: "Pérols",
      text: "Crevaison sur l'autoroute avant mes vacances. Intervention rapide et efficace. Ils m'ont même conseillé un bon garagiste pour le lendemain.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      name: "Chen Wei Ming",
      location: "Juvignac",
      text: "Dépannage de ma voiture hybride. L'équipe maîtrise parfaitement les nouvelles technologies. Service professionnel et soigné.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66"
    },
    {
      name: "Claudia Fernandez",
      location: "Grabels",
      text: "Ma voiture est tombée dans un fossé après la pluie. Ils ont sorti mon véhicule sans dommage avec un matériel adapté. Merci !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb"
    },
    {
      name: "Mamadou Diallo",
      location: "Montpellier Antigone",
      text: "Service d'enlèvement d'épave parfait. L'équipe a été très respectueuse et a géré toute la paperasse administrative. Service gratuit comme promis.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      name: "Amélie Bonnet",
      location: "Vendargues",
      text: "Besoin d'emmener ma voiture au port pour un ferry. Transport sécurisé et à l'heure. Mon voyage n'a pas été compromis.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    {
      name: "Yuki Tanaka",
      location: "Le Crès",
      text: "Dépannage d'urgence pour ma moto en pleine nuit. Réactivité exemplaire et tarifs honnêtes. Service très professionnel et courtois.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
    },
    {
      name: "Isabelle Roux",
      location: "Clapiers",
      text: "Camping-car en panne sur le parking d'un supermarché. Intervention délicate mais réussie. Équipe compétente et matériel professionnel.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    {
      name: "Omar El Fassi",
      location: "Saint-Gély-du-Fesc",
      text: "Sortie de fourrière express ! L'équipe a facilité toutes les démarches et récupéré ma voiture dès l'autorisation obtenue. Service impeccable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
    },
    {
      name: "Céline Morel",
      location: "Baillargues",
      text: "Transport longue distance pour un déménagement. Véhicule livré en parfait état à Paris. Service sûr et soigné comme annoncé.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0"
    },
    {
      name: "Giuseppe Rossi",
      location: "Montpellier Hôpitaux-Facultés",
      text: "Panne électrique complexe sur ma voiture hybride. L'équipe a su diagnostiquer et réparer le problème avec grande expertise. Molto bene !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
    },
    {
      name: "Fatima Benali",
      location: "Palavas-les-Flots",
      text: "Accident léger sur la route du littoral. Remorquage délicat mais parfaitement exécuté. L'équipe a préservé ma voiture des dégâts supplémentaires.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
    },
    {
      name: "Fabrice Hernandez",
      location: "Saint-Clément-de-Rivière",
      text: "Dépannage de ma camionnette de livraison un samedi matin. Intervention rapide qui m'a évité de perdre ma journée de travail. Merci !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Priya Sharma",
      location: "Jacou",
      text: "Crevaison de nuit sur l'A9. L'équipe est venue malgré les conditions difficiles et a changé ma roue en toute sécurité. Service exceptionnel.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    },
    {
      name: "Vincent Collin",
      location: "Castries",
      text: "Ma voiture ne démarrait plus après les fêtes. Diagnostic précis et remplacement de batterie immédiat. Tarifs corrects et service pro.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556"
    },
    {
      name: "Sandrine Duval",
      location: "Lunel",
      text: "Transport de ma moto vintage vers un salon. Manipulation soignée et sécurisée. Ils traitent les véhicules avec le plus grand respect.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b"
    },
    {
      name: "Dimitri Petrov",
      location: "Mauguio",
      text: "Enlèvement de ma vieille voiture hors d'usage. Démarches administratives prises en charge intégralement. Service gratuit et très efficace.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54"
    },
    {
      name: "Aïcha Kone",
      location: "Pignan",
      text: "Panne de direction assistée en centre-ville. Remorquage délicat dans les rues étroites. L'équipe a montré un pilotage expert avec matériel adapté.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
    },
    {
      name: "Lars Andersen",
      location: "Mudaison",
      text: "Sortie de fossé après aquaplanage. Opération de récupération impressionnante avec treuil. Aucun dommage supplémentaire sur le véhicule.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
    },
    {
      name: "Valérie Clement",
      location: "Carnon",
      text: "Besoin urgent d'emmener ma voiture au garage avant les vacances. Transport express organisé le jour même. Parfait pour les urgences !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
    },
    {
      name: "Philippe Moretti",
      location: "Fabrègues",
      text: "Intervention nocturne pour ma voiture en panne sur l'A750. Équipe professionnelle arrivée rapidement malgré l'heure tardive. Service impeccable et tarifs raisonnables.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    }
  ];

  // Fonction pour gérer le slideshow automatique
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000); // Change d'image toutes les 4 secondes

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  // Fonction pour gérer le carrousel de témoignages automatique (par groupes de 3)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => {
        const totalGroups = Math.ceil(testimonials.length / 3);
        return (prev + 3) >= testimonials.length ? 0 : prev + 3;
      });
    }, 8000); // Change de groupe de témoignages toutes les 8 secondes

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  // FAQs dynamiques basées sur les traductions
  const getFaqs = () => [
    {
      question: t('question1'),
      answer: t('answer1')
    },
    {
      question: t('question2'), 
      answer: t('answer2')
    },
    {
      question: t('question3'),
      answer: t('answer3')
    },
    {
      question: t('question4'),
      answer: t('answer4')
    },
    {
      question: t('question5'),
      answer: t('answer5')
    }
  ];

  // Témoignages dynamiques basés sur les traductions
  const getTestimonials = () => [
    {
      name: t('testimonial1Name'),
      location: t('testimonial1Location'),
      text: t('testimonial1Text'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1647934464726-25c3b2d53a4b"
    },
    {
      name: t('testimonial2Name'),
      location: t('testimonial2Location'),
      text: t('testimonial2Text'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1563895439929-873e667d3279"
    },
    {
      name: t('testimonial3Name'),
      location: t('testimonial3Location'),
      text: t('testimonial3Text'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1537149436249-b065c9f0950e"
    }
  ];

  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Dépannage Automobile",
      description: "Notre priorité : vous faire repartir rapidement et en toute sérénité.",
      features: ["Diagnostic de panne", "Dépannage sur place si possible", "Vous orienter vers la meilleure solution"],
      image: "https://i.ibb.co/w1hRQMJ/depannage-automobile-F.jpg"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Remorquage Véhicules",
      description: "Service professionnel 24H/7J pour tout type de véhicule léger ou utilitaire",
      features: ["Vous accompagner jusqu'au garage ou lieu de votre choix", "Intervention sur véhicule immobilisé ou accidenté: En ville, sur route ou en zone difficile d'accès"],
      image: "https://i.ibb.co/Z6sdLK3S/remorquage-v-hicule-F.jpg"
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Dépannage Batterie",
      description: "Batterie à plat ou hors service ? Intervention rapide et fiable, pour éviter l'immobilisation de votre véhicule",
      features: ["Test complet batterie, alternateur et fusibles", "Aide au démarrage d'urgence", "Remplacement si nécessaire"],
      image: "https://i.ibb.co/ynNMrBPM/panne-betterie-F.jpg"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Service Pneumatique",
      description: "Crevaison ou pneu endommagé ? Intervention sur route ou à domicile.",
      features: ["Remplacement immédiat", "Réparation crevaison", "Transport vers une centrale pneu"],
      image: "https://i.ibb.co/N253n7ry/crevaison-pneu-F.jpg"
    }
  ];

  const specializedServices = [
    {
      category: "Dépannage Spécialisé",
      services: [
        {
          title: "Parking Sous-Sol & Barrières",
          description: "Votre voiture est bloquée dans un parking souterrain ou à hauteur inferieur à 2 mètres ? Grâce à nos 4X4 paniers et notre expérience, nous pouvons sortir votre véhicule jusqu'à la destination souhaitée.",
          icon: "🅿️",
          image: "https://i.ibb.co/j9zycWQD/Sortie-parking-F.jpg"
        },
        {
          title: "Véhicules Utilitaires",
          description: "Besoin de dépanner un véhicule utilitaire ou professionnel ? Auto Express prend en charge les dépannages et remorquages de fourgons toutes tailles, camions bennes, camping-car, engins Btp et Agricoles en respectant vos contraintes de temps et d'activité.",
          icon: "🚛",
          image: "https://i.ibb.co/1Gt2rhDx/vehicules-utilitaires-F.jpg"
        },
        {
          title: "Transport Moto/Scooter",
          description: "Votre moto , scooter ou Quad en panne ? Nous assurons  un  transport sécurisé , qu'il s'agisse d'une intervention locale ou d'un transfert long distance.",
          icon: "🏍️",
          image: "https://i.ibb.co/k6KRL64p/transport-moto-F.jpg"
        }
      ]
    },
    {
      category: "Services Techniques",
      services: [
        {
          title: "Serrurerie Auto",
          description: "Clé cassée, perdue ou verrouillage accidentel du véhicule ? Nous intervenons rapidement pour ouvrir votre portière voiture sans l'endommager, et si besoin, nous aidons à trouver une solution de reprogrammation ou reproduction de clef.",
          icon: "🔑",
          image: "https://i.ibb.co/S7BgDx9Z/serrure-portiere-voiture-F.jpg"
        },
        {
          title: "Sortie de Fourrière",
          description: "Votre véhicule a été placé en fourrière ? Nous facilitons toutes les démarches administratives et sortons votre voiture dès obtention de l'autorisation afin de vous éviter tracas, perte de temps et frais de gardiennage.",
          icon: "🏢",
          image: "https://i.ibb.co/7xkH5LSY/Fourriere-Montpellier-F.jpg"
        },
        {
          title: "Sortie de Fossé/Ravin",
          description: "Votre véhicule est sorti de route ? Nos engins de remorquage puissants nous permettent de sortir les voitures embourbées, tombées dans un fossé ou sur le bas-côté, avec le plus grand soin pour préserver la mécanique.",
          icon: "🆘",
          image: "https://i.ibb.co/7d6NBZmP/Sortie-ravin-F.jpg"
        }
      ]
    },
    {
      category: "Transport & Enlèvement",
      services: [
        {
          title: "Enlèvement Épave",
          description: "Votre véhicule est hors d'usage (VHU)? Notre service d'enlèvement d'épaves est agréé et gratuit. Nous intervenons rapidement et prenons en charge l'enlèvement et  les démarches administratives afin de débarrasser votre véhicule en toute légalité.",
          icon: "♻️",
          image: "https://i.ibb.co/DPcMRdMY/enlevement-epave-F.jpg"
        },
        {
          title: "Transport Port/Bateau",
          description: "Votre voiture tombe en panne alors que vous deviez embarquer sur un ferry ? Pas de panique. Nous organisons son transport jusqu'au port ou terminal pour qu'elle puisse prendre le bateau comme prévu, sans compromettre votre voyage.",
          icon: "⚓",
          image: "https://i.ibb.co/RTNqGn6Q/Port-bateau-F.jpg"
        },
        {
          title: "Transport Longue Distance",
          description: "Auto Express propose le transport longue distance de véhicules sur l'ensemble de la France et vers les pays frontaliers. Un service sûr et soigné pour particuliers ou professionnels, que ce soit pour un convoyage, un achat ou un besoin exceptionnel.",
          icon: "🌍",
          image: "https://i.ibb.co/35SKqhk3/transport-longue-distance-F.jpg"
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "Intervenez-vous 24h/24 et 7j/7 sur Montpellier ?",
      answer: "Oui, nous assurons un service d'urgence 24h/24 et 7j/7 pour tous vos besoins de dépannage automobile et moto sur Montpellier et sa métropole."
    },
    {
      question: "Comment fonctionne la géolocalisation WhatsApp ?",
      answer: "Cliquez sur le bouton 'WhatsApp + GPS', autorisez la géolocalisation, et votre position exacte sera automatiquement envoyée via WhatsApp avec un lien Google Maps pour nous permettre de vous localiser instantanément."
    },
    {
      question: "Quels sont vos délais d'intervention sur Montpellier ?",
      answer: "Nos équipes interviennent en moyenne dans les 30 minutes suivant votre appel, selon votre localisation sur Montpellier Métropole. Avec la géolocalisation, nous pouvons vous trouver encore plus rapidement."
    },
    {
      question: "Quels types de véhicules pouvez-vous dépanner ?",
      answer: "Nous dépannons tous types de véhicules : voitures, motos, scooters, véhicules utilitaires, fourgons, bennes, camping-cars, caravanes, véhicules agricoles et BTP. Nous intervenons même dans les parkings sous-sol avec barrières basses."
    },
    {
      question: "Comment laisser un avis sur nos services ?",
      answer: "Vous pouvez laisser un avis en scannant le QR code dans la section témoignages de notre site, ou directement via notre page Google Business. Votre retour nous aide à améliorer continuellement nos services de dépannage."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#E8E8E8]/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0F2D52]/95 backdrop-blur-md border-b border-[#2A5CAA]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_roadside-aid/artifacts/l1p7fz24_PS%20Logo%20Icar%20Service.jpg"
                alt="Icar Assistance - Dépannage 24h/24"
                className="h-28 w-auto mr-2"
                onError={(e) => {
                  console.log('Erreur de chargement logo:', e.target.src);
                  // Fallback vers le texte si l'image ne se charge pas
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="text-2xl font-bold text-white" style={{display: 'none'}}>
                <span className="text-[#1693f1]">Auto</span>Express
              </div>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-[#3498DB] transition-colors font-semibold text-lg">{t('services')}</a>
              <a href="#quote" className="text-white hover:text-[#3498DB] transition-colors font-semibold text-lg">{t('quote')}</a>
              <a href="#about" className="text-white hover:text-[#3498DB] transition-colors font-semibold text-lg">{t('about')}</a>
              <a href="#testimonials" className="text-white hover:text-[#3498DB] transition-colors font-semibold text-lg">{t('testimonials')}</a>
              <a href="#contact" className="text-white hover:text-[#3498DB] transition-colors font-semibold text-lg">{t('contact')}</a>
            </div>

            {/* Emergency Call Button */}
            <motion.a
              href="tel:+33781505555"
              className="hidden md:flex items-center space-x-3 bg-[#F39C12] hover:bg-[#3498DB] text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-6 h-6" />
              <span className="text-xl">+33 7 81 50 55 55</span>
            </motion.a>

            {/* Language Selector */}
            <div className="relative hidden md:block language-selector">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300"
              >
                <Globe className="w-5 h-5" />
                <span className="text-lg">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <span className="font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.code.toUpperCase()}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                        currentLanguage === language.code ? 'bg-blue-50 text-[#2A5CAA]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{language.flag}</span>
                      <span className="font-medium">{language.name}</span>
                      <span className="text-sm text-gray-500 ml-auto">{language.code.toUpperCase()}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#E8E8E8]/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className="block text-slate-800 hover:text-[#2A5CAA] text-lg font-semibold">Services</a>
              <a href="#quote" className="block text-slate-800 hover:text-[#2A5CAA] text-lg font-semibold">Devis</a>
              <a href="#about" className="block text-slate-800 hover:text-[#2A5CAA] text-lg font-semibold">À propos</a>
              <a href="#testimonials" className="block text-slate-800 hover:text-[#2A5CAA] text-lg font-semibold">Témoignages</a>
              <a href="#contact" className="block text-slate-800 hover:text-[#2A5CAA] text-lg font-semibold">Contact</a>
              <a
                href="tel:+33781505555"
                className="flex items-center space-x-3 bg-[#c9473e] text-white px-6 py-4 rounded-full text-lg font-bold w-fit"
              >
                <Phone className="w-6 h-6" />
                <span className="text-xl">+33 7 81 50 55 55</span>
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A5CAA]/20 to-[#E8E8E8]/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-[#F39C12]/20 text-[#F39C12] px-4 py-2 rounded-full mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{t('emergency')}</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
                <span className="text-[#0F2D52]">{t('heroTitle').split(' ')[0]}</span>
                <span className="text-[#F39C12]"> {t('heroTitle').split(' ')[1]}</span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#2C3E50] mb-8 leading-relaxed">
                {t('heroSubtitle')}
              </h2>
              
              <p className="text-xl text-slate-800 mb-8 leading-relaxed text-justify" dangerouslySetInnerHTML={{__html: t('heroDescription')}}>
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a
                  href="tel:+33781505555"
                  className="inline-flex items-center justify-center space-x-3 bg-[#F39C12] hover:bg-[#3498DB] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  <span>Appel d'urgence</span>
                </motion.a>
                
                <motion.button
                  onClick={() => setShowQuoteForm(true)}
                  className="inline-flex items-center justify-center space-x-3 bg-[#2A5CAA] hover:bg-[#3498DB] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Devis Gratuit</span>
                </motion.button>
                
                <motion.button
                  onClick={getLocation}
                  className="inline-flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={locationStatus === 'loading'}
                >
                  {locationStatus === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Localisation...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-6 h-6" />
                      <Navigation className="w-5 h-5" />
                      <span>WhatsApp + GPS</span>
                    </>
                  )}
                </motion.button>
              </div>

              <div className="flex items-center space-x-8 mt-8">
                <div className="flex items-center space-x-2 text-slate-800">
                  <Clock className="w-5 h-5 text-[#1693f1]" />
                  <span>Intervention sous 30min</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Navigation className="w-5 h-5 text-green-500" />
                  <span>Localisation GPS</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Shield className="w-5 h-5 text-[#1693f1]" />
                  <span>Professionnel et à l'écoute</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Slideshow Container */}
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Container */}
                <div className="relative w-full h-full">
                  {slideshowImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentSlide ? 1 : 0 }}
                      transition={{ duration: 1 }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={image.onError}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:text-[#1693f1] transition-colors" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:text-[#1693f1] transition-colors" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-[#1693f1] scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                  {currentSlide + 1} / {slideshowImages.length}
                </div>
              </div>

              {/* Slideshow Caption */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-center"
              >
                <p className="text-slate-800 font-medium">
                  {slideshowImages[currentSlide].alt}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-[#0F2D52]">Nos Services </span><span className="text-[#F39C12]">Experts</span>
            </h2>
            <p className="text-xl text-[#0F2D52] max-w-3xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </motion.div>

          {/* Services Principaux */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E8E8E8]/20 hover:border-[#2A5CAA]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[#1693f1] mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-800 mb-6 text-justify">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 bg-[#1693f1] rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Services Spécialisés */}
          <div className="space-y-16">
            {specializedServices.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              >
                <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                  <span className="text-[#1693f1]">{category.category}</span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={serviceIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                      className="bg-gradient-to-br from-white to-[#E8E8E8]/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E8E8E8]/20 hover:border-[#2A5CAA]/40 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 text-4xl bg-white/90 rounded-full p-3 backdrop-blur-sm">
                          {service.icon}
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h4>
                        <p className="text-slate-800 leading-relaxed text-justify">{service.description}</p>
                        <div className="mt-4 pt-4 border-t border-[#E8E8E8]/20">
                          <span className="text-[#2A5CAA] text-sm font-semibold">Service disponible 24h/24</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16 bg-gradient-to-r from-[#E8E8E8]/20 to-[#2A5CAA]/20 rounded-2xl p-12 border border-[#2A5CAA]/30 shadow-lg"
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Besoin d'un Service Spécialisé ?
            </h3>
            <p className="text-xl text-slate-800 mb-8 max-w-2xl mx-auto">
              Quelle que soit votre situation de dépannage sur Montpellier, Notre équipe professionnelle et expérimentée a la solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="tel:+33781505555"
                className="inline-flex items-center space-x-3 bg-[#F39C12] hover:bg-[#3498DB] text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span>Devis Immédiat</span>
              </motion.a>
              <motion.button
                onClick={getLocation}
                className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6" />
                <Navigation className="w-5 h-5" />
                <span>Localisation GPS</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-[#87a2b8]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
                {t('whyChooseTitle')} 
                <span className="text-[#0F2D52]">{t('whyChooseSubtitle').split(' ')[0]}</span>
                <span className="text-[#F39C12]"> {t('whyChooseSubtitle').split(' ')[1]}</span> ?
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{t('rapidIntervention')}</h3>
                    <p className="text-slate-800">{t('rapidInterventionDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{t('technicalExpertise')}</h3>
                    <p className="text-slate-800">{t('technicalExpertiseDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{t('transparentPricing')}</h3>
                    <p className="text-slate-800">{t('transparentPricingDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{t('montpellierCoverage')}</h3>
                    <p className="text-slate-800">{t('montpellierCoverageDesc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.ibb.co/5X0q05Hy/nuage-de-mot-F.jpg"
                  alt="Icar Assistance - Services de dépannage professionnel à Montpellier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Overlay text */}
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="text-[#0F2D52]">Icar</span>
                    <span className="text-[#F39C12]"> Assistance</span>
                  </h3>
                  <p className="text-lg">Votre partenaire de confiance à Montpellier</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-[#0F2D52]">Ils parlent de </span><span className="text-[#F39C12]">Nous</span>
            </h2>
            <p className="text-xl text-slate-800">
              {t('testimonialsSubtitle')}
            </p>
          </motion.div>

          {/* Carrousel de témoignages (3 par vue) */}
          <div className="relative mb-16">
            {/* Navigation précédent/suivant */}
            <button
              onClick={() => setCurrentTestimonial((prev) => {
                const totalGroups = Math.ceil(testimonials.length / 3);
                const currentGroup = Math.floor(prev / 3);
                const prevGroup = currentGroup === 0 ? totalGroups - 1 : currentGroup - 1;
                return prevGroup * 3;
              })}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#1693f1]" />
            </button>
            
            <button
              onClick={() => setCurrentTestimonial((prev) => {
                const nextIndex = prev + 3;
                return nextIndex >= testimonials.length ? 0 : nextIndex;
              })}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#1693f1]" />
            </button>

            {/* Affichage des 3 témoignages actuels */}
            <motion.div
              key={Math.floor(currentTestimonial / 3)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6 px-16"
            >
              {testimonials.slice(currentTestimonial, currentTestimonial + 3).map((testimonial, index) => (
                <div
                  key={currentTestimonial + index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E8E8E8]/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-800 mb-6 italic text-sm leading-relaxed line-clamp-4">
                      "{testimonial.text}"
                    </p>
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#2A5CAA]/20"
                      />
                      <div>
                        <h4 className="text-slate-800 font-semibold text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-slate-600 text-xs">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Indicateurs de pagination (par groupes de 3) */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, groupIndex) => (
                <button
                  key={groupIndex}
                  onClick={() => setCurrentTestimonial(groupIndex * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentTestimonial / 3) === groupIndex
                      ? 'bg-[#2A5CAA] scale-125'
                      : 'bg-[#E8E8E8] hover:bg-[#2C3E50]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* QR Code Section pour les avis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#0F2D52]/20 to-[#2A5CAA]/20 rounded-2xl p-12 border border-[#2A5CAA]/30 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">
                <span className="text-[#0F2D52]">Vous Aussi, Partagez Votre </span><span className="text-[#F39C12]">Expérience !</span>
              </h3>
              
              <p className="text-xl text-slate-800 mb-8">
                Votre avis compte ! Aidez d'autres clients en partageant votre expérience avec Icar Assistance.
              </p>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl mb-4">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://g.page/r/YourGoogleReviewsLink/review"
                      alt="QR Code pour laisser un avis"
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-blue-200 font-semibold">Scannez avec votre téléphone</p>
                </div>

                {/* Instructions */}
                <div className="flex-1 text-left">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2">Scannez le QR Code</h4>
                        <p className="text-slate-800">Utilisez l'appareil photo de votre téléphone pour scanner le code</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2">Évaluez notre service</h4>
                        <p className="text-slate-800">Donnez votre note et rédigez votre commentaire</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-[#1693f1] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2">Publiez votre avis</h4>
                        <p className="text-slate-800">Votre retour nous aide à améliorer nos services</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.a
                      href="https://g.page/r/YourGoogleReviewsLink/review"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-3 bg-[#2A5CAA] hover:bg-[#3498DB] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star className="w-5 h-5" />
                      <span>Laisser un avis Google</span>
                    </motion.a>
                    
                    <motion.a
                      href="tel:+33781505555"
                      className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Nous contacter</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-wrap justify-center items-center space-x-8 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>Note moyenne : 4.9/5</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📱</span>
                    <span>Avis en 30 secondes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🔒</span>
                    <span>100% sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#E8E8E8]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-[#0F2D52]">{t('faqTitle').split(' ')[0]}</span> <span className="text-[#F39C12]">{t('faqTitle').split(' ').slice(1).join(' ')}</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-slate-800 font-semibold text-lg">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#1693f1] transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-slate-800 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-[#0F2D52] to-[#2A5CAA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Une Panne ? <span className="text-[#F39C12]">Appelez-Nous !</span>
            </h2>
            <p className="text-xl text-white mb-8">
              Service d'urgence disponible 24h/24 - Intervention rapide sur Montpellier Métropole
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
              <motion.a
                href="tel:+33781505555"
                className="inline-flex items-center space-x-3 bg-[#F39C12] hover:bg-[#3498DB] text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span>+33 7 81 50 55 55</span>
              </motion.a>

              <motion.button
                onClick={getLocation}
                className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={locationStatus === 'loading'}
              >
                {locationStatus === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Localisation...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-6 h-6" />
                    <Navigation className="w-5 h-5" />
                    <span>WhatsApp GPS</span>
                  </>
                )}
              </motion.button>
              
              <div className="flex flex-col space-y-3">
                <motion.div
                  className="inline-flex items-center justify-center space-x-3 bg-[#2A5CAA] hover:bg-[#3498DB] text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 border-2 border-[#2A5CAA] hover:border-[#3498DB]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Email : autoexpres34@gmail.com</span>
                </motion.div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-slate-800">
              <div>
                <Clock className="w-8 h-8 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">Disponibilité</h3>
                <p>24h/24 - 7j/7</p>
              </div>
              <div>
                <MapPin className="w-8 h-8 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">Zone d'intervention</h3>
                <p>Montpellier Métropole</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">Garantie</h3>
                <p>Satisfaction client</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowQuoteForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#2C3E50] rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#2A5CAA]/30"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Demande de <span className="text-[#1693f1]">Devis Gratuit</span>
                </h2>
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-8">
                {/* Informations Véhicule */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Car className="w-6 h-6 mr-3 text-[#1693f1]" />
                    Informations du Véhicule
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Type de véhicule *</label>
                      <input
                        type="text"
                        name="vehicleType"
                        value={quoteForm.vehicleType}
                        onChange={handleQuoteFormChange}
                        placeholder="Ex: Voiture, Moto, Utilitaire..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Marque *</label>
                      <input
                        type="text"
                        name="brand"
                        value={quoteForm.brand}
                        onChange={handleQuoteFormChange}
                        placeholder="Ex: Peugeot, Renault, BMW..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Modèle *</label>
                      <input
                        type="text"
                        name="model"
                        value={quoteForm.model}
                        onChange={handleQuoteFormChange}
                        placeholder="Ex: 308, Clio, X3..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Plaque d'immatriculation</label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={quoteForm.licensePlate}
                        onChange={handleQuoteFormChange}
                        placeholder="Ex: AB-123-CD"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Roues du véhicule</label>
                      <select
                        name="fourWheelDrive"
                        value={quoteForm.fourWheelDrive}
                        onChange={handleQuoteFormChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#2A5CAA] focus:outline-none transition-colors"
                      >
                        <option value="" style={{color: 'black'}}>Sélectionner</option>
                        <option value="Roue libre" style={{color: 'black'}}>Roue libre</option>
                        <option value="Roue bloquée" style={{color: 'black'}}>Roue bloquée</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Boîte de vitesse</label>
                      <select
                        name="gearbox"
                        value={quoteForm.gearbox}
                        onChange={handleQuoteFormChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#2A5CAA] focus:outline-none transition-colors"
                      >
                        <option value="" style={{color: 'black'}}>Sélectionner</option>
                        <option value="Manuelle" style={{color: 'black'}}>Manuelle</option>
                        <option value="Automatique" style={{color: 'black'}}>Automatique</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">État du véhicule</label>
                      <select
                        name="breakdown"
                        value={quoteForm.breakdown}
                        onChange={handleQuoteFormChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#2A5CAA] focus:outline-none transition-colors"
                      >
                        <option value="" style={{color: 'black'}}>Sélectionner</option>
                        <option value="Panne" style={{color: 'black'}}>Panne</option>
                        <option value="Accidenté" style={{color: 'black'}}>Accidenté</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Informations Transport */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-[#1693f1]" />
                    Informations de Transport
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Adresse d'enlèvement *</label>
                      <textarea
                        name="pickupAddress"
                        value={quoteForm.pickupAddress}
                        onChange={handleQuoteFormChange}
                        placeholder="Adresse complète d'enlèvement"
                        rows="3"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Lieu de dépôt *</label>
                      <textarea
                        name="dropoffLocation"
                        value={quoteForm.dropoffLocation}
                        onChange={handleQuoteFormChange}
                        placeholder="Adresse de destination"
                        rows="3"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">Date d'enlèvement souhaitée</label>
                      <input
                        type="text"
                        name="pickupDate"
                        value={quoteForm.pickupDate}
                        onChange={handleQuoteFormChange}
                        placeholder="Ex: Aujourd'hui, Demain, 15/01/2025..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Informations Contact */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Phone className="w-6 h-6 mr-3 text-blue-400" />
                    Vos Coordonnées
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">Nom Prénom *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={quoteForm.fullName}
                        onChange={handleQuoteFormChange}
                        placeholder="Votre nom et prénom complets"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={quoteForm.phone}
                        onChange={handleQuoteFormChange}
                        placeholder="06 XX XX XX XX"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={quoteForm.email}
                        onChange={handleQuoteFormChange}
                        placeholder="votre@email.com"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">Précisions supplémentaires</label>
                      <textarea
                        name="details"
                        value={quoteForm.details}
                        onChange={handleQuoteFormChange}
                        placeholder="Informations complémentaires sur votre demande..."
                        rows="4"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#2A5CAA] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Envoyer via WhatsApp</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* Devis Section */}
      <section id="quote" className="py-20 bg-gradient-to-r from-[#2A5CAA] to-[#0F2D52]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Demandez Votre <span className="text-[#F39C12]">Devis Gratuit</span>
            </h2>
            <p className="text-xl text-white mb-8">
              Obtenez rapidement un devis personnalisé pour votre dépannage ou transport
            </p>
            
            <motion.button
              onClick={() => setShowQuoteForm(true)}
              className="inline-flex items-center space-x-3 bg-white hover:bg-gray-100 text-[#1693f1] px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Obtenir mon devis</span>
            </motion.button>
            
            <p className="text-white mt-4 text-sm">
              ✅ Devis gratuit et sans engagement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Géolocalisation Section */}
      <section className="py-20 bg-gradient-to-r from-[#27AE60] to-[#27AE60]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-6 rounded-full">
                <MessageCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Envoyez Votre Position via <span className="text-green-200">WhatsApp</span>
            </h2>
            
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Partagez instantanément votre localisation GPS précise via WhatsApp. 
              Nos équipes vous localisent en quelques secondes partout sur Montpellier !
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Cliquez sur le bouton</h3>
                <p className="text-green-100 text-sm">Autorisez la géolocalisation sur votre téléphone</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Position automatique</h3>
                <p className="text-green-100 text-sm">Votre position GPS est ajoutée automatiquement</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Envoi instantané</h3>
                <p className="text-green-100 text-sm">Votre demande arrive directement chez nous</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                onClick={getLocation}
                className="inline-flex items-center space-x-3 bg-white hover:bg-gray-100 text-green-700 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={locationStatus === 'loading'}
              >
                {locationStatus === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                    <span>Localisation en cours...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-6 h-6" />
                    <Navigation className="w-6 h-6" />
                    <span>Envoyer ma position</span>
                  </>
                )}
              </motion.button>
              
              <motion.button
                onClick={sendWhatsAppMessage}
                className="inline-flex items-center space-x-3 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm border border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp sans GPS</span>
              </motion.button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-2 text-green-100">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">
                Votre position est partagée uniquement avec Icar Assistance pour le dépannage
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_roadside-aid/artifacts/l1p7fz24_PS%20Logo%20Icar%20Service.jpg"
                alt="Icar Assistance Logo"
                className="h-24 w-auto mr-4"
                onError={(e) => {
                  console.log('Erreur footer logo:', e.target.src);
                  // Fallback vers le texte
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="text-2xl font-bold text-white" style={{display: 'none'}}>
                <span className="text-[#1693f1]">Auto</span>Express
              </div>
              <div className="text-gray-400">
                <p className="text-sm">Votre spécialiste du dépannage automobile, moto et utilitaire sur Montpellier.</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Phone className="w-4 h-4" />
                  <span>+33 7 81 50 55 55</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dépannage Auto/Moto</li>
                <li>Remorquage Spécialisé</li>
                <li>Transport Longue Distance</li>
                <li>Serrurerie Automobile</li>
                <li>Enlèvement Épave</li>
                <li>Service Pneus</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Zones</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Montpellier Centre</li>
                <li>Castelnau-le-Lez</li>
                <li>Lattes - Pérols</li>
                <li>Saint-Jean-de-Védas</li>
                <li>Juvignac - Grabels</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+33 7 81 50 55 55 (24h/24)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp avec GPS</span>
                </li>
                <li>autoexpres34@gmail.com</li>
                <li>Devis gratuit</li>
              </ul>
              
              {/* Réseaux Sociaux */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">{t('followUs')}</h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://www.instagram.com/autoexpres34/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-[#F39C12] to-[#3498DB] rounded-full flex items-center justify-center hover:from-[#3498DB] hover:to-[#F39C12] transition-all duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={t('instagramTooltip')}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.facebook.com/profile.php?id=61578160629390"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={t('facebookTooltip')}
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.snapchat.com/add/hwello07?share_id=mPCR4xFWHWE&locale=fr-FR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={t('snapchatTooltip')}
                  >
                    <img 
                      src="https://i.ibb.co/x8s76HFC/Snapchat.png"
                      alt="Snapchat"
                      className="w-5 h-5"
                      onError={(e) => {
                        console.log('Erreur logo Snapchat:', e.target.src);
                        // Fallback vers une icône SVG simple
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" style={{display: 'none'}}>
                      <path d="M12.166 3c3.483 0 6.334 2.851 6.334 6.334 0 3.483-2.851 6.334-6.334 6.334s-6.334-2.851-6.334-6.334c0-3.483 2.851-6.334 6.334-6.334zm0 1.2c-2.836 0-5.134 2.298-5.134 5.134s2.298 5.134 5.134 5.134 5.134-2.298 5.134-5.134-2.298-5.134-5.134-5.134zm-1.155 2.023c.392-.392 1.025-.392 1.417 0l2.121 2.121c.392.392.392 1.025 0 1.417l-2.121 2.121c-.392.392-1.025.392-1.417 0-.392-.392-.392-1.025 0-1.417l1.414-1.414-1.414-1.414c-.392-.392-.392-1.025 0-1.417z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Icar Assistance Montpellier. Tous droits réservés. | Mentions légales | Politique de confidentialité</p>
          </div>
        </div>
      </footer>

      {/* Boutons Flottants Sidebar Droite */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {/* Appel d'Urgence */}
        <motion.a
          href="tel:+33781505555"
          className="group relative w-16 h-16 bg-[#F39C12] hover:bg-[#3498DB] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          title="Appel d'urgence"
        >
          <Phone className="w-7 h-7 text-white" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-[#2C3E50] text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            📞 Appel d'urgence
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-[#2C3E50]"></div>
          </div>
        </motion.a>

        {/* Géolocalisation WhatsApp */}
        <motion.button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  const message = `🚨 URGENCE DÉPANNAGE 🚨%0A%0ABonjour Icar Assistance,%0A%0AJ'ai besoin d'une intervention de dépannage.%0A%0AMa position exacte : https://www.google.com/maps?q=${latitude},${longitude}%0A%0AMerci d'intervenir rapidement !`;
                  const whatsappUrl = `https://wa.me/33781505555?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                },
                () => {
                  // Fallback si géolocalisation refusée
                  const message = `🚨 URGENCE DÉPANNAGE 🚨%0A%0ABonjour Icar Assistance,%0A%0AJ'ai besoin d'une intervention de dépannage.%0A%0AJe vous communique ma position par message.%0A%0AMerci d'intervenir rapidement !`;
                  const whatsappUrl = `https://wa.me/33781505555?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                }
              );
            }
          }}
          className="group relative w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          title="Envoyer géolocalisation"
        >
          <Navigation className="w-7 h-7 text-white" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-[#2C3E50] text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            📍 Envoyer ma position
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-[#2C3E50]"></div>
          </div>
        </motion.button>

        {/* Contact Email */}
        <motion.a
          href="mailto:autoexpres34@gmail.com?subject=Demande de dépannage&body=Bonjour Icar Assistance,%0A%0AJe souhaite vous contacter pour..."
          className="group relative w-16 h-16 bg-[#2A5CAA] hover:bg-[#3498DB] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          title="Contact par email"
        >
          <Mail className="w-7 h-7 text-white" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-[#2C3E50] text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            ✉️ Contact par email
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-[#2C3E50]"></div>
          </div>
        </motion.a>
      </div>
    </div>
  );
};

export default HomePage;