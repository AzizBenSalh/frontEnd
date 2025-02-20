import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, AlertCircle, CheckCircle2, Building2, Users2, Headphones } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 to-cyan-300">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/[0.8] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question ou assistance.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-gradient-to-r from-sky-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">2000+</h3>
            <p className="text-gray-600">Pharmacies partenaires à travers la Tunisie</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-gradient-to-r from-sky-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Users2 className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
            <p className="text-gray-600">Utilisateurs actifs sur notre plateforme</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-gradient-to-r from-sky-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Headphones className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support client disponible</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Informations de contact
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-3 rounded-xl">
                    <Phone className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600 mb-2">Support technique et général</p>
                    <a href="tel:+21612345678" className="text-sky-600 font-medium hover:text-sky-700">
                      +216 12 345 678
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mb-2">Notre équipe vous répondra dans les plus brefs délais</p>
                    <a href="mailto:contact@pharmaweekend.com" className="text-sky-600 font-medium hover:text-sky-700">
                      contact@pharmaweekend.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600 mb-2">Siège social</p>
                    <p className="text-gray-900">
                      123 Rue de la Santé<br />
                      Tunis, Tunisie 1002
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Heures d'ouverture</h3>
                    <p className="text-gray-600 mb-2">Support technique</p>
                    <div className="space-y-1">
                      <p className="text-gray-900">Lundi - Vendredi: 8h00 - 20h00</p>
                      <p className="text-gray-900">Samedi: 9h00 - 18h00</p>
                      <p className="text-gray-900">Dimanche: 10h00 - 16h00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Envoyez-nous un message
            </h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl">
              {status === 'error' && (
                <div className="mb-6 flex items-center p-4 text-red-700 bg-red-100 rounded-xl">
                  <AlertCircle className="h-5 w-5 mr-3" />
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              {status === 'success' && (
                <div className="mb-6 flex items-center p-4 text-emerald-700 bg-emerald-100 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 mr-3" />
                  Message envoyé avec succès !
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all"
                    placeholder="Le sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-4 rounded-xl hover:from-sky-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* FAQ Preview */}
            <div className="mt-8 bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <MessageCircle className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Questions fréquentes</h3>
                  <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900">Comment créer un compte pharmacien ?</h4>
                  <p className="text-gray-600 text-sm mt-1">Découvrez le processus simple d'inscription...</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900">Comment mettre à jour mes informations ?</h4>
                  <p className="text-gray-600 text-sm mt-1">Apprenez à gérer votre profil et vos données...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}