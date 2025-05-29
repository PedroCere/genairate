import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DeactivateAccountModal from '../components/common/modals/DesactivateAccountModal.jsx';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/authService';

export default function AccountPage() {
  const { t } = useTranslation();
  const { isOffline } = useAuth();
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handleDeactivate = () => {
    console.log('Cuenta desactivada (mock)');
  };

  const initialUser = {
    name: 'Agustín Paltrucci',
    email: 'agus.perez@example.com',
    username: 'aguspaltrucci',
    joined: '2023-01-15',
  };

  const [user, setUser] = useState(initialUser);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    if (!isOffline) {
      getUserProfile()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Failed to load user profile:', error);
          setUser(initialUser);
        });
    } else {
      setUser(initialUser);
    }
  }, [isOffline]);

  const startEdit = (field) => {
    setEditField(field);
    setTempValue(user[field]);
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue('');
  };

  const saveEdit = () => {
    setUser((prev) => ({ ...prev, [editField]: tempValue }));
    setEditField(null);
    setTempValue('');
  };

  const renderField = (label, field, description) => (
    <div className="py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="mt-2 sm:mt-0 text-sm text-gray-800 dark:text-gray-200">
        {editField === field ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 px-2 py-1 rounded"
            />
            <button onClick={saveEdit} className="text-blue-600 hover:underline">Guardar</button>
            <button onClick={cancelEdit} className="text-red-600 hover:underline">Cancelar</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{user[field] || '—'}</span>
            <button onClick={() => startEdit(field)} className="text-blue-600 hover:underline">Editar</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
      {/* Main settings */}
      <div>
        {/* Fields */}
        {renderField('Email address', 'email', 'Tu dirección de correo')}
        {renderField('Username and subdomain', 'username', 'Tu nombre de usuario visible')}
        {renderField('Profile information', 'name', 'Edita tu nombre, bio y pronombres')}
        {renderField('Profile design', '', 'Personaliza tu perfil visual')}
        {renderField('Custom domain', '', 'Asocia un dominio personalizado')}
        {renderField('Partner program', '', 'Programa de creadores de contenido')}

        {/* Danger zone */}
        <div className="mt-12 space-y-4 text-sm">
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="text-orange-600 hover:underline"
          >
            Deactivate account
          </button>

          {showDeactivateModal && (
            <DeactivateAccountModal
              onClose={() => setShowDeactivateModal(false)}
              onConfirm={handleDeactivate}
            />
          )}

          <button className="text-red-600 hover:underline">Delete account</button>
        </div>
      </div>

      {/* Right column */}
      <aside className="space-y-6">
        <h3 className="text-sm font-semibold">Suggested help articles</h3>
        <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
          <li><a href="#" className="hover:underline">Sign in or sign up to GenAIrate</a></li>
          <li><a href="#" className="hover:underline">Your profile page</a></li>
          <li><a href="#" className="hover:underline">Publishing your first story</a></li>
          <li><a href="#" className="hover:underline">Understanding writing rules</a></li>
          <li><a href="#" className="hover:underline">What’s the Partner Program?</a></li>
        </ul>
      </aside>
    </div>
  );
}
