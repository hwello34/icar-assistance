import React, { useState } from "react";
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
  Menu,
  X,
  MessageCircle,
  Navigation,
  AlertCircle
} from "lucide-react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

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
        const message = `🚨 URGENCE DÉPANNAGE 🚨%0A%0ABonjour AutoExpress,%0A%0AJ'ai besoin d'une intervention de dépannage.%0A%0A📍 Ma position exacte :%0ALatitude: ${latitude}%0ALongitude: ${longitude}%0A%0A🔗 Lien Google Maps: https://www.google.com/maps?q=${latitude},${longitude}%0A%0AMerci d'intervenir rapidement !`;
        
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
    const message = `🚨 URGENCE DÉPANNAGE 🚨%0A%0ABonjour AutoExpress,%0A%0AJ'ai besoin d'une intervention de dépannage.%0A%0AJe vous communique ma position par message.%0A%0AMerci d'intervenir rapidement !`;
    const whatsappUrl = `https://wa.me/33781505555?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Dépannage Automobile",
      description: "Intervention rapide pour tous types de pannes auto",
      features: ["Diagnostic complet", "Réparation sur place", "Véhicules de toutes marques"],
      image: "https://images.pexels.com/photos/784139/pexels-photo-784139.jpeg"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Remorquage Véhicules",
      description: "Service de remorquage professionnel 24h/24",
      features: ["Dépanneuses équipées", "Transport sécurisé", "Tous types de véhicules"],
      image: "https://images.pexels.com/photos/7997458/pexels-photo-7997458.jpeg"
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Dépannage Batterie",
      description: "Démarrage et remplacement batterie",
      features: ["Démarrage d'urgence", "Remplacement sur place", "Batteries de qualité"],
      image: "https://images.pexels.com/photos/7562123/pexels-photo-7562123.jpeg"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Réparation Crevaison",
      description: "Réparation et remplacement de pneus",
      features: ["Réparation rapide", "Changement de roue", "Roue de secours"],
      image: "https://images.unsplash.com/photo-1588987910398-b0977d2d578d"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      location: "Montpellier Centre",
      text: "Service impeccable ! Ils sont arrivés en 20 minutes près de la Place de la Comédie et ont résolu ma panne rapidement. Je recommande vivement AutoExpress.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1647934464726-25c3b2d53a4b"
    },
    {
      name: "Jean Martinez",
      location: "Castelnau-le-Lez",
      text: "Ma moto est tombée en panne sur la rocade. Professionnels et réactifs, ils ont été là en un temps record avec une dépanneuse adaptée.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1563895439929-873e667d3279"
    },
    {
      name: "Sophie Laurent",
      location: "Lattes",
      text: "Batterie à plat devant Odysseum. Tarifs transparents et service de qualité. Ils ont changé ma batterie en quelques minutes seulement.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1537149436249-b065c9f0950e"
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
      question: "Couvrez-vous toute la métropole de Montpellier ?",
      answer: "Oui, nous intervenons sur Montpellier et toutes les communes de la métropole : Castelnau-le-Lez, Lattes, Pérols, Saint-Jean-de-Védas, Juvignac, et bien d'autres."
    },
    {
      question: "Mes données de localisation sont-elles sécurisées ?",
      answer: "Oui, votre position GPS est partagée uniquement avec AutoExpress via WhatsApp pour le dépannage. Nous ne stockons pas vos données de localisation et les utilisons uniquement pour l'intervention demandée."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://i.imgur.com/YfI4JO3.png"
                alt="AutoExpress - Dépannage 24h/24"
                className="h-14 w-auto mr-2"
                onError={(e) => {
                  console.log('Erreur de chargement logo:', e.target.src);
                  // Fallback vers le texte si l'image ne se charge pas
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="text-2xl font-bold text-white" style={{display: 'none'}}>
                <span className="text-blue-400">Auto</span>Express
              </div>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors">À propos</a>
              <a href="#testimonials" className="text-white hover:text-blue-400 transition-colors">Témoignages</a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
            </div>

            {/* Emergency Call Button */}
            <motion.a
              href="tel:0781505555"
              className="hidden md:flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              <span>07 81 50 55 55</span>
            </motion.a>

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
            className="md:hidden bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className="block text-slate-800 hover:text-blue-600">Services</a>
              <a href="#about" className="block text-slate-800 hover:text-blue-600">À propos</a>
              <a href="#testimonials" className="block text-slate-800 hover:text-blue-600">Témoignages</a>
              <a href="#contact" className="block text-slate-800 hover:text-blue-600">Contact</a>
              <a
                href="tel:0781505555"
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-full font-semibold w-fit"
              >
                <Phone className="w-5 h-5" />
                <span>07 81 50 55 55</span>
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Service d'urgence 24h/24</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Dépannage 
                <span className="text-blue-400"> Express</span>
                <br />
                <span className="text-3xl lg:text-4xl">à Montpellier</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Panne d'auto, moto ou utilitaire ? Batterie à plat ? Crevaison ? 
                Nos experts interviennent rapidement partout sur Montpellier Métropole.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a
                  href="tel:0781505555"
                  className="inline-flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  <span>Appel d'urgence</span>
                </motion.a>
                
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
                
                <motion.a
                  href="#services"
                  className="inline-flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Nos services</span>
                </motion.a>
              </div>

              <div className="flex items-center space-x-8 mt-8">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Intervention sous 30min</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Navigation className="w-5 h-5 text-green-400" />
                  <span>Localisation GPS</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>Garantie satisfaction</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1652081848323-5f425c65c2c7"
                  alt="Dépanneuse AutoExpress en intervention"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Géolocalisation Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
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
                Votre position est partagée uniquement avec AutoExpress pour le dépannage
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Nos Services <span className="text-blue-400">Experts</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dépannage automobile, moto et utilitaire avec des professionnels qualifiés sur Montpellier
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-blue-400 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Pourquoi Choisir 
                <span className="text-blue-400"> AutoExpress</span> ?
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Rapidité d'intervention</h3>
                    <p className="text-gray-300">Nos équipes interviennent dans les 30 minutes suivant votre appel sur Montpellier.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Expertise technique</h3>
                    <p className="text-gray-300">Techniciens certifiés avec plus de 10 ans d'expérience en dépannage.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Tarifs transparents</h3>
                    <p className="text-gray-300">Devis gratuit et sans engagement. Pas de frais cachés.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Couverture Montpellier Métropole</h3>
                    <p className="text-gray-300">Service disponible sur Montpellier et toutes les communes de la métropole.</p>
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
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/7997458/pexels-photo-7997458.jpeg"
                  alt="Dépanneuse AutoExpress"
                  className="rounded-xl h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1588987910398-b0977d2d578d"
                  alt="Réparation de pneu"
                  className="rounded-xl h-48 object-cover mt-8"
                />
                <img
                  src="https://images.pexels.com/photos/7562123/pexels-photo-7562123.jpeg"
                  alt="Assistance routière"
                  className="rounded-xl h-48 object-cover -mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1612732789926-d81e503d10f9"
                  alt="Service automobile professionnel"
                  className="rounded-xl h-48 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ils Nous Font <span className="text-blue-400">Confiance</span>
            </h2>
            <p className="text-xl text-gray-300">
              Plus de 5 000 clients satisfaits sur Montpellier Métropole
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Questions <span className="text-blue-400">Fréquentes</span>
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
                  <span className="text-white font-semibold text-lg">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-blue-400 transition-transform ${
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
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Une Panne ? Appelez-Nous !
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Service d'urgence disponible 24h/24 - Intervention rapide sur Montpellier Métropole
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
              <motion.a
                href="tel:0781505555"
                className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span>07 81 50 55 55</span>
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
              
              <div className="text-blue-100">
                <p className="font-semibold">Email : contact@autoexpress.fr</p>
                <p>Devis gratuit par téléphone</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-blue-100">
              <div>
                <Clock className="w-8 h-8 mx-auto mb-4 text-blue-300" />
                <h3 className="font-semibold mb-2">Disponibilité</h3>
                <p>24h/24 - 7j/7</p>
              </div>
              <div>
                <MapPin className="w-8 h-8 mx-auto mb-4 text-blue-300" />
                <h3 className="font-semibold mb-2">Zone d'intervention</h3>
                <p>Montpellier Métropole</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-4 text-blue-300" />
                <h3 className="font-semibold mb-2">Garantie</h3>
                <p>Satisfaction client</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/2JRDbj0.png"
                alt="AutoExpress Logo"
                className="h-16 w-auto mr-4"
                onError={(e) => {
                  console.log('Tentative footer:', e.target.src);
                  // Essaie avec différents formats
                  if (e.target.src.includes('2JRDbj0.png')) {
                    e.target.src = 'https://i.imgur.com/2JRDbj0.jpg';
                  } else if (e.target.src.includes('2JRDbj0.jpg')) {
                    e.target.src = 'https://i.imgur.com/2JRDbj0.jpeg';
                  } else if (e.target.src.includes('2JRDbj0.jpeg')) {
                    e.target.src = 'https://imgur.com/2JRDbj0.png';
                  } else {
                    // Fallback vers le texte
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="text-2xl font-bold text-white" style={{display: 'none'}}>
                <span className="text-blue-400">Auto</span>Express
              </div>
              <div className="text-gray-400">
                <p className="text-sm">Votre spécialiste du dépannage automobile, moto et utilitaire sur Montpellier.</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Phone className="w-4 h-4" />
                  <span>07 81 50 55 55</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dépannage Auto</li>
                <li>Remorquage</li>
                <li>Dépannage Moto</li>
                <li>Remplacement Batterie</li>
                <li>Réparation Crevaison</li>
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
                  <span>07 81 50 55 55 (24h/24)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp avec GPS</span>
                </li>
                <li>contact@autoexpress.fr</li>
                <li>Devis gratuit</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AutoExpress Montpellier. Tous droits réservés. | Mentions légales | Politique de confidentialité</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;