import React, { useState } from 'react';

export default function AccountPage() {
  // Mock user data
  const initialUser = {
    name: 'Pedro Pérez',
    email: 'pedro.perez@example.com',
    username: 'pedroperez',
    joined: '2023-01-15',
  };

  const userService = {
    getPreferences: () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(mockPreferences), 500);
      }),
    updatePreferences: (prefs) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(prefs), 500);
      }),
      eliminateUser: (elim) => 
        new Promise((resolve) => {
          setTimeout(() => resolve(elim), 500);
        })
  };

  const [user, setUser] = useState(initialUser);
  const [preferences, setPreferences] = useState({});
  const [eliminated, setEliminated] = useState({});
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [eliminating, setEliminating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [eliminateSuccess, setEliminatesuccess] = useState(false);



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

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleSave = () => {
    setSaving(true);
    userService.updatePreferences(preferences).then(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    });
  };

  const handleElimination = () => {
    setEliminating(true);
    userService.eliminateUser(eliminated).then(() => {
      setEliminating(false);
      setEliminatesuccess(true);
      setTimeout(() => setEliminatesuccess(false), 3000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-6">Cuenta</h1>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 space-y-6">
        {/* Name */}
        <div>
          <h2 className="text-xl font-semibold mb-1 flex items-center justify-between">
            Nombre
            {editField !== 'name' ? (
              <button
                onClick={() => startEdit('name')}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={saveEdit}
                  className="text-green-600 hover:underline text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-red-600 hover:underline text-sm"
                >
                  Cancelar
                </button>
              </div>
            )}
          </h2>
          {editField === 'name' ? (
            <input
              type="text"
              value={tempValue}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <h2 className="text-xl font-semibold mb-1 flex items-center justify-between">
            Correo electrónico
            {editField !== 'email' ? (
              <button
                onClick={() => startEdit('email')}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={saveEdit}
                  className="text-green-600 hover:underline text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-red-600 hover:underline text-sm"
                >
                  Cancelar
                </button>
              </div>
            )}
          </h2>
          {editField === 'email' ? (
            <input
              type="email"
              value={tempValue}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <h2 className="text-xl font-semibold mb-1 flex items-center justify-between">
            Nombre de usuario
            {editField !== 'username' ? (
              <button
                onClick={() => startEdit('username')}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={saveEdit}
                  className="text-green-600 hover:underline text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-red-600 hover:underline text-sm"
                >
                  Cancelar
                </button>
              </div>
            )}
          </h2>
          {editField === 'username' ? (
            <input
              type="text"
              value={tempValue}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>

        {/* Joined */}
        <div>
          <h2 className="text-xl font-semibold mb-1">Fecha de registro</h2>
          <p>{user.joined}</p>
        </div>

          {/* Save */}
        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          {saveSuccess && (
            <p className="mt-2 text-green-600 dark:text-green-400 font-medium">
              Preferencias guardadas con éxito.
            </p>
          )}
        </div>

          {/* Eliminar */}
          <div>
          <button
            onClick={handleElimination}
            disabled={eliminating}
            className="w-full bg-red-600 text-white px-10 py-1.5 rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            {eliminating ? 'Eliminando cuenta...' : 'Eliminar cuenta'}
          </button>
          {eliminateSuccess && (
            <p className="mt-2 text-red-600 dark:text-red-400 font-medium">
              Cuenta eliminada con éxito.
            </p>
          )}
        </div>

      </div>
    </div>

    
  );
}
