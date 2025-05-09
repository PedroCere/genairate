import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function GenerateBlogModal({ onGenerate, onClose }) {
  const { t } = useTranslation();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('profesional');
  const [language, setLanguage] = useState('es');

  const handleGenerate = () => {
    if (topic.trim() === '') return;
    onGenerate({ topic, tone, language });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 max-w-xl w-full mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🧠 Generar artículo con IA
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Tópico / Idea principal
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: Cómo la IA impacta en la educación"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Tono
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="profesional">Profesional</option>
            <option value="creativo">Creativo</option>
            <option value="seo">SEO</option>
            <option value="informal">Informal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Idioma
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          className="mt-4 w-full bg-primary text-black dark:text-white font-semibold px-6 py-3 rounded-full hover:bg-cyan-600 transition disabled:opacity-50"
        >
          🚀 Generar artículo
        </button>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 hover:underline w-full"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
