import React, { useState, useEffect } from 'react';

const mockPreferences = {
  defaultLanguage: 'es',
  defaultTone: 'Formal',
  defaultFormat: 'Blog Post',
  enableTTS: false,
  enableAutocorrect: true,
};

// Mock userService with getPreferences and updatePreferences
const userService = {
  getPreferences: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(mockPreferences), 500);
    }),
  updatePreferences: (prefs) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(prefs), 500);
    }),
};

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    defaultLanguage: '',
    defaultTone: '',
    defaultFormat: '',
    enableTTS: false,
    enableAutocorrect: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    userService.getPreferences().then((prefs) => {
      setPreferences(prefs);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    userService.updatePreferences(preferences).then(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-700 dark:text-gray-300">
        Cargando preferencias...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-6">Configuración</h1>

      <div className="space-y-6">
        {/* Default Language */}
        <div>
          <label htmlFor="defaultLanguage" className="block mb-2 font-medium">
            Idioma por defecto
          </label>
          <select
            id="defaultLanguage"
            name="defaultLanguage"
            value={preferences.defaultLanguage}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        {/* Default Tone */}
        <div>
          <label htmlFor="defaultTone" className="block mb-2 font-medium">
            Tono por defecto
          </label>
          <select
            id="defaultTone"
            name="defaultTone"
            value={preferences.defaultTone}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Amigable">Amigable</option>
            <option value="Profesional">Profesional</option>
          </select>
        </div>

        {/* Default Format */}
        <div>
          <label htmlFor="defaultFormat" className="block mb-2 font-medium">
            Formato por defecto
          </label>
          <select
            id="defaultFormat"
            name="defaultFormat"
            value={preferences.defaultFormat}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="Blog Post">Blog Post</option>
            <option value="Artículo">Artículo</option>
            <option value="Correo Electrónico">Correo Electrónico</option>
            <option value="Informe">Informe</option>
          </select>
        </div>

        {/* Enable TTS */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="enableTTS"
            name="enableTTS"
            checked={preferences.enableTTS}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <label htmlFor="enableTTS" className="font-medium">
            Activar TTS
          </label>
        </div>

        {/* Enable Autocorrect */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="enableAutocorrect"
            name="enableAutocorrect"
            checked={preferences.enableAutocorrect}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <label htmlFor="enableAutocorrect" className="font-medium">
            Activar corrección automática
          </label>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Preferencias'}
          </button>
          {saveSuccess && (
            <p className="mt-2 text-green-600 dark:text-green-400 font-medium">
              Preferencias guardadas con éxito.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
