import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1E293B] border-b border-[#2C3A50] px-6 py-4 shadow-xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo y marca */}
        <div className="flex items-center space-x-3 group">
          <div className="p-2 bg-[#06B6D4] rounded-lg shadow-md transform transition-all duration-300 hover:rotate-12">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight bg-gradient-to-r from-[#06B6D4] to-[#C084FC] bg-clip-text text-transparent">
            GenAirate
          </h1>
        </div>

        {/* Controles derecho */}
        <div className="flex items-center space-x-6">
          <button 
            className="flex items-center space-x-2 bg-[#06B6D4]/90 hover:bg-[#06B6D4] text-white px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => console.log('Nuevo artículo')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Nuevo Artículo</span>
          </button>

          {/* Perfil de usuario con dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 100)}
            >
              <div className="w-9 h-9 bg-[#C084FC] rounded-full flex items-center justify-center text-white font-bold shadow-md transform transition-all duration-200 group-hover:scale-110">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-white">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-[#94A3B8]">Plan: Pro</p>
              </div>
            </button>

            {/* Menú desplegable */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2C3A50] rounded-lg shadow-xl border border-[#3E4C62]">
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#3E4C62] rounded-md transition-colors">
                    Mi Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#3E4C62] rounded-md transition-colors">
                    Configuración
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}