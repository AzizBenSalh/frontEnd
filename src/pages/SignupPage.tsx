import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building2, AlertCircle, Upload, Pill } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Pour un compte pharmacien, le certificat est requis
      if (role === 'pharmacy_owner' && !certificate) {
        setError('Veuillez télécharger votre certificat de pharmacien');
        setIsLoading(false);
        return;
      }

      // Préparation des données à envoyer à l'API
      const payload = { name, email, password, role };

      // Appel POST vers l'API de signup
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Une erreur est survenue lors de l'inscription");
      } else {
        // En supposant que l'API retourne l'utilisateur créé (ou un token)
        const data = await response.json();
        // Par exemple : { message: "...", user: { id, email, name, role } }
        login(data.user); // Connecte l'utilisateur dans le contexte
        navigate('/');
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Background with Images */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Main background image */}
          <img
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
            alt="Modern Pharmacy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/90 to-purple-600/90 mix-blend-multiply animate-gradient-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_60%)]"></div>
          {/* Floating images */}
          <div className="absolute top-1/4 -left-10 transform -rotate-12 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl animate-float-slow">
            <img
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Pharmacy Interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 -right-10 transform rotate-12 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl animate-float-slow-reverse">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medications"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-white text-center p-12 max-w-lg">
            <h2 className="text-4xl font-bold mb-6">Rejoignez PHARMA Weekend</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Créez votre compte pour accéder à tous nos services
            </p>
            <div className="mt-12 space-y-6">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/20">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Compte Utilisateur</h3>
                    <p className="text-sm text-white/80">Recherchez et localisez vos médicaments</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/20">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Compte Pharmacien</h3>
                    <p className="text-sm text-white/80">Gérez votre pharmacie en ligne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-3 rounded-2xl">
                <Pill className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 text-transparent bg-clip-text mb-3">
              Créer un compte
            </h1>
            <p className="text-gray-600">
              Remplissez le formulaire pour commencer
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center text-red-700 animate-shake">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-violet-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-100 transition-all duration-300 outline-none"
                    placeholder="Nom complet"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-violet-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-100 transition-all duration-300 outline-none"
                    placeholder="Adresse email"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-violet-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-100 transition-all duration-300 outline-none"
                    placeholder="Mot de passe"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Type de compte
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`flex items-center justify-center p-4 border rounded-xl transition-all duration-300 ${
                      role === 'user'
                        ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                        : 'border-gray-200 hover:border-violet-200 hover:bg-violet-50'
                    }`}
                    onClick={() => setRole('user')}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Utilisateur
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center p-4 border rounded-xl transition-all duration-300 ${
                      role === 'pharmacy_owner'
                        ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                        : 'border-gray-200 hover:border-violet-200 hover:bg-violet-50'
                    }`}
                    onClick={() => setRole('pharmacy_owner')}
                  >
                    <Building2 className="h-5 w-5 mr-2" />
                    Pharmacien
                  </button>
                </div>
              </div>

              {role === 'pharmacy_owner' && (
                <div className="animate-fadeIn">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Certificat de pharmacien
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
                      certificate
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-300 hover:border-violet-400 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <Upload className={`h-8 w-8 mx-auto mb-2 ${certificate ? 'text-violet-500' : 'text-gray-400'}`} />
                    {certificate ? (
                      <p className="text-violet-600 font-medium">{certificate.name}</p>
                    ) : (
                      <div>
                        <p className="text-gray-600">Cliquez pour télécharger votre certificat</p>
                        <p className="text-sm text-gray-500 mt-1">PDF, JPG ou PNG</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </span>
              ) : (
                'Créer un compte'
              )}
            </button>

            <p className="text-center text-gray-600">
              Déjà inscrit ?{' '}
              <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
                Connectez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
