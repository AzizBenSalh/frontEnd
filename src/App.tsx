import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Clock, MapPin, Pill, Phone, Heart, ArrowRight, Star, Users, Mail, Package, Calendar } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import PharmaciesMap from './components/PharmaciesMap';
import MedicamentsPage from './components/MedicamentsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import StockManagementPage from './pages/StockManagementPage';
import OpeningHoursPage from './pages/OpeningHoursPage';
import UserMenu from './components/UserMenu';

function App() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  // Don't show the navigation on login and signup pages
  const showNav = !['/login', '/signup'].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {showNav && (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-sky-500 to-cyan-400 p-2 rounded-lg">
                  <Pill className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 text-transparent bg-clip-text">
                  PHARMA Weekend
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className={`text-gray-700 hover:text-sky-500 font-medium ${location.pathname === '/' ? 'text-sky-500' : ''}`}>Accueil</Link>
                <Link to="/medicaments" className={`text-gray-700 hover:text-sky-500 font-medium ${location.pathname === '/medicaments' ? 'text-sky-500' : ''}`}>Médicaments</Link>
                <Link to="/pharmacies" className={`text-gray-700 hover:text-sky-500 font-medium ${location.pathname === '/pharmacies' ? 'text-sky-500' : ''}`}>Pharmacies</Link>
                {isAuthenticated && user?.role === 'pharmacy_owner' && (
                  <>
                    <Link to="/stock" className={`text-gray-700 hover:text-sky-500 font-medium ${location.pathname === '/stock' ? 'text-sky-500' : ''}`}>
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>Gestion des stocks</span>
                      </div>
                    </Link>
                    <Link to="/horaires" className={`text-gray-700 hover:text-sky-500 font-medium ${location.pathname === '/horaires' ? 'text-sky-500' : ''}`}>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Horaires</span>
                      </div>
                    </Link>
                  </>
                )}
                <Link to="/contact" className={`text-gray-700 hover:text-sky-500 font-medium ${location.pathname === '/contact' ? 'text-sky-500' : ''}`}>Contact</Link>
                
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-sky-200 transition-all duration-300"
                  >
                    Connexion
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pharmacies" element={<PharmaciesMap />} />
        <Route path="/medicaments" element={<MedicamentsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/stock" element={<StockManagementPage />} />
        <Route path="/horaires" element={<OpeningHoursPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      {showNav && (
        <footer className="bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-sky-500 to-cyan-400 p-2 rounded-lg">
                    <Pill className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">PHARMA Weekend</span>
                </div>
                <p className="text-gray-400">
                  Votre plateforme de recherche de médicaments disponibles
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to="/" className="hover:text-sky-400 transition-colors">Accueil</Link></li>
                  <li><Link to="/medicaments" className="hover:text-sky-400 transition-colors">Médicaments</Link></li>
                  <li><Link to="/pharmacies" className="hover:text-sky-400 transition-colors">Pharmacies</Link></li>
                  <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Légal</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><a href="#" className="hover:text-sky-400 transition-colors">Mentions légales</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition-colors">Politique de confidentialité</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition-colors">CGU</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>support@pharmaweekend.fr</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>01 23 45 67 89</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
              <p>&copy; 2024 PHARMA Weekend. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-600 px-4 py-2 rounded-full">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-medium">Votre santé, notre priorité</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Trouvez vos <span className="text-sky-500">médicaments</span> en quelques clics
              </h1>
              <p className="text-xl text-gray-600">
                Localisez les pharmacies ouvertes et vérifiez la disponibilité des médicaments en temps réel
              </p>
              
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-lg shadow-sky-100/50">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative group">
                      <Pill className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 h-5 w-5 transition-colors group-hover:text-sky-500" />
                      <input
                        type="text"
                        placeholder="Nom du médicament"
                        className="w-full h-14 pl-14 pr-5 bg-white/80 border-0 rounded-2xl focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-gray-400 text-gray-600"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative group">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 h-5 w-5 transition-colors group-hover:text-sky-500" />
                      <input
                        type="text"
                        placeholder="Votre localisation"
                        className="w-full h-14 pl-14 pr-5 bg-white/80 border-0 rounded-2xl focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-gray-400 text-gray-600"
                      />
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white h-14 px-8 rounded-2xl hover:shadow-lg hover:shadow-sky-200/50 transition-all duration-300 flex items-center justify-center space-x-2 min-w-[180px]">
                    <span>Rechercher</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2000+</p>
                    <p className="text-gray-600">Pharmacies</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-gray-600">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-cyan-400/20 rounded-[40px] blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
                alt="Pharmacy"
                className="relative rounded-[40px] shadow-2xl shadow-sky-200"
              />
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temps moyen de recherche</p>
                    <p className="text-lg font-bold text-gray-900">2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir <span className="text-sky-500">PHARMA Weekend</span> ?
            </h2>
            <p className="text-xl text-gray-600">
              Notre plateforme innovante simplifie la recherche de médicaments et vous connecte aux pharmacies de proximité
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[30px] shadow-xl shadow-sky-100 hover:shadow-2xl hover:shadow-sky-200 transition-all duration-300">
              <div className="bg-gradient-to-r from-sky-500 to-cyan-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Temps réel</h3>
              <p className="text-gray-600">Consultez la disponibilité des médicaments mise à jour instantanément</p>
            </div>
            
            <div className="bg-white p-8 rounded-[30px] shadow-xl shadow-sky-100 hover:shadow-2xl hover:shadow-sky-200 transition-all duration-300">
              <div className="bg-gradient-to-r from-sky-500 to-cyan-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Géolocalisation</h3>
              <p className="text-gray-600">Trouvez rapidement les pharmacies les plus proches de votre position</p>
            </div>
            
            <div className="bg-white p-8 rounded-[30px] shadow-xl shadow-sky-100 hover:shadow-2xl hover:shadow-sky-200 transition-all duration-300">
              <div className="bg-gradient-to-r from-sky-500 to-cyan-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact direct</h3>
              <p className="text-gray-600">Réservez vos médicaments directement auprès des pharmacies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="py-24 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-[40px] p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">Urgence médicale ?</h3>
                <p className="text-red-100 text-xl">
                  Contactez immédiatement les services d'urgence
                </p>
              </div>
              <a
                href="tel:15"
                className="bg-white text-red-500 px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3 text-xl font-bold"
              >
                <Phone className="h-6 w-6" />
                <span>Appeler le 15</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;