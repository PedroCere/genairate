import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getRecentArticles } from '../services/ContentService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

import meme1 from '../assets/meme1.jpg';
import meme2 from '../assets/meme2.jpg';
import meme3 from '../assets/meme3.jpg';
import meme4 from '../assets/meme4.jpg';

const memeImages = [meme1, meme2, meme3, meme4];

const tones = ['informativo', 'motivacional', 'analítico'];
const types = ['guía', 'lista', 'análisis'];
const languages = ['es', 'en'];

const mockedArticles = [
  {
    id: 'offline-1',
    title: 'Artículo de ejemplo 1',
    createdAt: new Date().toISOString(),
    tone: 'informativo',
    type: 'guía',
    language: 'es',
    image: meme1,
  },
  {
    id: 'offline-2',
    title: 'Artículo de ejemplo 2',
    createdAt: new Date().toISOString(),
    tone: 'motivacional',
    type: 'lista',
    language: 'es',
    image: meme2,
  },
];

export default function HistoryPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isOffline } = useAuth();

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    tone: '',
    type: '',
    language: '',
  });

  useEffect(() => {
    i18n.changeLanguage('es');
  }, [i18n]);

  useEffect(() => {
    setLoading(true);
    if (isOffline) {
      setArticles(mockedArticles);
      setLoading(false);
    } else {
      getRecentArticles()
        .then((data) => {
          setArticles(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar artículos:', error);
          setArticles([]);
          setLoading(false);
        });
    }
  }, [isOffline]);

  useEffect(() => {
    let filtered = articles;
    if (filters.dateFrom)
      filtered = filtered.filter(a => new Date(a.createdAt) >= new Date(filters.dateFrom));
    if (filters.dateTo)
      filtered = filtered.filter(a => new Date(a.createdAt) <= new Date(filters.dateTo));
    if (filters.tone) filtered = filtered.filter(a => a.tone === filters.tone);
    if (filters.type) filtered = filtered.filter(a => a.type === filters.type);
    if (filters.language) filtered = filtered.filter(a => a.language === filters.language);
    setFilteredArticles(filtered);
  }, [filters, articles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => navigate(`/editor/${id}`);
  const handlePreview = (id) => navigate(`/preview/${id}`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">{t('Tus artículos')}</h1>

      <details className="mb-6 border rounded-xl p-4 bg-surface-card">
        <summary className="font-semibold cursor-pointer">🎛 {t('Filtros')}</summary>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} className="input" />
          <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} className="input" />
          <select name="tone" value={filters.tone} onChange={handleChange} className="input">
            <option value="">{t('Tono')}</option>
            {tones.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="type" value={filters.type} onChange={handleChange} className="input">
            <option value="">{t('Tipo')}</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="language" value={filters.language} onChange={handleChange} className="input">
            <option value="">{t('Idioma')}</option>
            {languages.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>
      </details>

      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
      ) : filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No se encontraron artículos.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-md transition-all overflow-hidden flex flex-col">
              <img
                src={article.image || memeImages[idx % memeImages.length]}
                alt="preview"
                className="h-40 object-cover w-full"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(article.createdAt).toLocaleDateString()} · {article.tone} · {article.language.toUpperCase()}
                </p>
                <div className="mt-auto flex justify-between gap-2 text-sm">
                  <button onClick={() => handleEdit(article.id)} className="text-green-600 hover:underline">✏️ Editar</button>
                  <button onClick={() => handlePreview(article.id)} className="text-blue-600 hover:underline">👁 Ver</button>
                  <button onClick={() => alert('Duplicado')} className="text-yellow-600 hover:underline">📄 Duplicar</button>
                  <button onClick={() => alert('Eliminado')} className="text-red-600 hover:underline">🗑 Borrar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
