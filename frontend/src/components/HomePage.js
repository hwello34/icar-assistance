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

  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Dépannage Automobile",
      description: "Intervention rapide pour tous types de pannes auto",
      features: ["Diagnostic complet", "Réparation sur place", "Véhicules de toutes marques"]
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Dépannage Moto & Utilitaire",
      description: "Spécialistes des deux-roues et véhicules utilitaires",
      features: ["Motos et scooters", "Camionnettes", "Véhicules professionnels"]
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Remplacement Batterie",
      description: "Service batterie disponible 24h/24",
      features: ["Batteries de qualité", "Installation immédiate", "Garantie constructeur"]
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Réparation Crevaison",
      description: "Réparation et remplacement de pneus",
      features: ["Réparation rapide", "Changement de roue", "Équilibrage inclus"]
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      location: "Paris 15ème",
      text: "Service impeccable ! Ils sont arrivés en 20 minutes et ont résolu ma panne rapidement. Je recommande vivement AutoExpress.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1649769069590-268b0b994462?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxtZWNoYW5pY3xlbnwwfHx8Ymx1ZXwxNzUwNjQ4MjQzfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Jean Martinez",
      location: "Versailles",
      text: "Professionnels et réactifs. Ma moto est tombée en panne sur l'autoroute, ils ont été là en un temps record.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1649768870222-17848797d6b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxtZWNoYW5pY3xlbnwwfHx8Ymx1ZXwxNzUwNjQ4MjQzfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Sophie Laurent",
      location: "Saint-Germain",
      text: "Tarifs transparents et service de qualité. Ils ont changé ma batterie en quelques minutes seulement.",
      rating: 5,
      image: "https://images.pexels.com/photos/7688590/pexels-photo-7688590.jpeg"
    }
  ];

  const faqs = [
    {
      question: "Intervenez-vous 24h/24 et 7j/7 ?",
      answer: "Oui, nous assurons un service d'urgence 24h/24 et 7j/7 pour tous vos besoins de dépannage automobile et moto."
    },
    {
      question: "Quels sont vos délais d'intervention ?",
      answer: "Nos équipes interviennent en moyenne dans les 30 minutes suivant votre appel, selon votre localisation en Île-de-France."
    },
    {
      question: "Acceptez-vous les paiements par carte ?",
      answer: "Oui, nous acceptons tous les modes de paiement : espèces, carte bancaire, chèque, et paiement par assurance."
    },
    {
      question: "Vos tarifs sont-ils transparents ?",
      answer: "Absolument ! Nous vous communiquons un devis clair avant toute intervention. Pas de surprises, pas de frais cachés."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-400">Auto</span>Express
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
              href="tel:0123456789"
              className="hidden md:flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              <span>01 23 45 67 89</span>
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
                href="tel:0123456789"
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-full font-semibold w-fit"
              >
                <Phone className="w-5 h-5" />
                <span>01 23 45 67 89</span>
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
                <span className="text-3xl lg:text-4xl">en Île-de-France</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Panne d'auto, moto ou utilitaire ? Batterie à plat ? Crevaison ? 
                Nos experts interviennent rapidement partout en Île-de-France.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a
                  href="tel:0123456789"
                  className="inline-flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  <span>Appel d'urgence</span>
                </motion.a>
                
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
                  src="https://images.pexels.com/photos/7562123/pexels-photo-7562123.jpeg"
                  alt="Dépannage automobile professionnel"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
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
              Dépannage automobile, moto et utilitaire avec des professionnels qualifiés
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-blue-400 mb-6">
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
                    <p className="text-gray-300">Nos équipes interviennent dans les 30 minutes suivant votre appel.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Expertise technique</h3>
                    <p className="text-gray-300">Techniciens certifiés avec plus de 10 ans d'expérience.</p>
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
                    <h3 className="text-xl font-bold text-white mb-2">Couverture Île-de-France</h3>
                    <p className="text-gray-300">Service disponible dans tous les départements franciliens.</p>
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
                  src="https://images.unsplash.com/photo-1652081848323-5f425c65c2c7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxyb2Fkc2lkZSUyMGFzc2lzdGFuY2V8ZW58MHx8fGJsdWV8MTc1MDY0ODIyMXww&ixlib=rb-4.1.0&q=85"
                  alt="Véhicule de dépannage"
                  className="rounded-xl h-48 object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/8986147/pexels-photo-8986147.jpeg"
                  alt="Réparation de pneu"
                  className="rounded-xl h-48 object-cover mt-8"
                />
                <img
                  src="https://images.pexels.com/photos/696411/pexels-photo-696411.jpeg"
                  alt="Mécanicien professionnel"
                  className="rounded-xl h-48 object-cover -mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1612732789926-d81e503d10f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHx0aXJlJTIwcmVwYWlyfGVufDB8fHxibHVlfDE3NTA2NDgyNTJ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Équipement professionnel"
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
              Plus de 10 000 clients satisfaits en Île-de-France
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
              Service d'urgence disponible 24h/24 - Intervention rapide en Île-de-France
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
              <motion.a
                href="tel:0123456789"
                className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span>01 23 45 67 89</span>
              </motion.a>
              
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
                <p>Toute l'Île-de-France</p>
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
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                <span className="text-blue-400">Auto</span>Express
              </div>
              <p className="text-gray-400 mb-4">
                Votre spécialiste du dépannage automobile, moto et utilitaire en Île-de-France.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>01 23 45 67 89</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dépannage Auto</li>
                <li>Dépannage Moto</li>
                <li>Véhicules Utilitaires</li>
                <li>Remplacement Batterie</li>
                <li>Réparation Crevaison</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Zones</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Paris et Petite Couronne</li>
                <li>Grande Couronne</li>
                <li>Autoroutes A1, A4, A6</li>
                <li>Rocades franciliennes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>24h/24 - 7j/7</li>
                <li>contact@autoexpress.fr</li>
                <li>Devis gratuit</li>
                <li>Paiement sécurisé</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AutoExpress. Tous droits réservés. | Mentions légales | Politique de confidentialité</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;