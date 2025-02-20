import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/90 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-gradient-to-r from-sky-500 to-cyan-400 w-8 h-8 rounded-full flex items-center justify-center">
          {user?.role === 'pharmacy_owner' ? (
            <Building2 className="h-4 w-4 text-white" />
          ) : (
            <User className="h-4 w-4 text-white" />
          )}
        </div>
        <span className="text-gray-700 font-medium">{user?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4 mr-3" />
            Paramètres
          </Link>
          
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}