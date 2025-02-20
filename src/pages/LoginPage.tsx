import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Pill, Users, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Appel API pour se connecter
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Email ou mot de passe incorrect');
        return;
      }

      const data = await response.json();
      // Supposons que l'API retourne { user: { id, email, name, role } }
      login(data.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-sky-500 to-cyan-400 p-3 rounded-2xl">
                <Pill className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 text-transparent bg-clip-text mb-3">
              Bienvenue
            </h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre compte
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
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-sky-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100 transition-all duration-300 outline-none"
                    placeholder="Adresse email"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-sky-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100 transition-all duration-300 outline-none"
                    placeholder="Mot de passe"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>

            <p className="text-center text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/signup" className="text-sky-600 hover:text-sky-700 font-medium">
                Créez-en un
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Animated Background with Images */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Main background image */}
          <img
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Modern Pharmacy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/90 to-cyan-400/90 mix-blend-multiply animate-gradient-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_60%)]"></div>
          {/* Floating images */}
          <div className="absolute top-1/4 -left-10 transform -rotate-12 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl animate-float-slow">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Pharmacy Interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 -right-10 transform rotate-12 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl animate-float-slow-reverse">
            <img
              src="https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medications"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-white text-center p-12 max-w-lg">
            <h2 className="text-4xl font-bold mb-6">PHARMA Weekend</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Votre plateforme de confiance pour la gestion et la recherche de médicaments
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">2000+</h3>
                <p className="text-white/80">Pharmacies</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg">
                <div className="flex items-center justify-center mb-3">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">98%</h3>
                <p className="text-white/80">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
