import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactDOM from 'react-dom';

function DropdownMenu({ logout, onClose, position }) {
  return ReactDOM.createPortal(
    <div
      className="absolute mt-2 w-48 max-w-screen origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 z-50"
      style={{ top: position.top, left: position.left, right: 'auto' }}
    >
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          console.log('Perfil');
          onClose();
        }}
      >
        Mi Perfil
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          console.log('Configuración');
          onClose();
        }}
      >
        Configuración
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
        onClick={() => {
          logout();
          onClose();
        }}
      >
        Cerrar Sesión
      </button>
    </div>
    ,document.body
  );
}

export default function NavBarFixed() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#1E293B] border-b border-[#2C3A50] shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 justify-between items-center relative">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#06B6D4] to-[#C084FC] rounded-md shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#C084FC] bg-clip-text text-transparent">
              GenAirate
            </span>
          </div>

          {/* Acción: Nuevo Artículo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => console.log('Nuevo artículo')}
              className="hidden sm:inline-flex items-center gap-2 rounded-md bg-[#06B6D4] hover:bg-[#0891b2] text-white px-3 py-2 text-sm font-medium transition"
            >
              <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Artículo
            </button>

            {/* Perfil */}
            <div className="relative overflow-visible">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1E293B]"
              >
                <span className="sr-only">Abrir menú de usuario</span>
                <div className="w-8 h-8 rounded-full bg-[#C084FC] text-white flex items-center justify-center font-semibold shadow-md">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>

              {menuOpen && (
                <DropdownMenu logout={logout} onClose={() => setMenuOpen(false)} position={dropdownPosition} />
              )}
            </div>
          </div>

          {/* Menú móvil */}
          <div className="absolute right-0 top-full mt-2 w-48 max-w-[90vw] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú colapsable móvil */}
      {isOpen && (
        <div className="sm:hidden px-2 pb-3 space-y-1">
          <button className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-white bg-[#334155]">
            Dashboard
          </button>
          <button className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#334155] hover:text-white">
            Mi Perfil
          </button>
          <button className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#334155] hover:text-white">
            Configuración
          </button>
        </div>
      )}
    </nav>
  );
}
