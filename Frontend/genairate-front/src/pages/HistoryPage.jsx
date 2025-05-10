import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { useTranslation } from 'react-i18next';
import { getRecentArticles } from '../services/ContentService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import meme1 from '../assets/meme1.jpg';
import meme2 from '../assets/meme2.jpg';
import meme3 from '../assets/meme3.jpg';
import meme4 from '../assets/meme4.jpg';

const tones = ['informativo', 'motivacional', 'analítico'];
const types = ['guía', 'lista', 'análisis'];
const languages = ['es', 'en'];

const memeImages = [meme1, meme2, meme3, meme4];

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

  useEffect(() => {
    i18n.changeLanguage('es');
  }, [i18n]);

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    tone: '',
    type: '',
    language: '',
  });
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.error('Failed to fetch recent blogs:', error);
          setArticles([]);
          setLoading(false);
        });
    }
  }, [isOffline]);

  useEffect(() => {
    let filtered = articles;

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (a) => new Date(a.createdAt) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (a) => new Date(a.createdAt) <= new Date(filters.dateTo)
      );
    }
    if (filters.tone) {
      filtered = filtered.filter((a) => a.tone && a.tone === filters.tone);
    }
    if (filters.type) {
      filtered = filtered.filter((a) => a.type && a.type === filters.type);
    }
    if (filters.language) {
      filtered = filtered.filter((a) => a.language && a.language === filters.language);
    }

    setFilteredArticles(filtered);
  }, [filters, articles]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleView(id) {
    console.log('View article', id);
  }

  function handleEdit(id) {
    navigate(`/editor/${id}`);
  }

  function handleDuplicate(id) {
    console.log('Duplicate article', id);
  }

  function handleDelete(id) {
    console.log('Delete article', id);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-8">
        {t('HistoryPageTitle')}
      </h1>

      <section className="mb-8 flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t('NoArticlesFound')}
          </p>
        ) : (
          filteredArticles.map((article, index) => {
            const articleWithMeme = {
              ...article,
              image: article.image || memeImages[index % memeImages.length],
            };
            return (
              <div key={article.id} className="border rounded-md p-4 bg-white dark:bg-gray-800 shadow-sm">
                <ArticleCard article={articleWithMeme} />
                <div className="mt-2 flex gap-4 text-sm">
                  <button
                    onClick={() => handleView(article.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {t('View')}
                  </button>
                  <button
                    onClick={() => handleEdit(article.id)}
                    className="text-green-600 hover:underline"
                  >
                    {t('Edit')}
                  </button>
                  <button
                    onClick={() => handleDuplicate(article.id)}
                    className="text-yellow-600 hover:underline"
                  >
                    {t('Duplicate')}
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:underline"
                  >
                    {t('Delete')}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
