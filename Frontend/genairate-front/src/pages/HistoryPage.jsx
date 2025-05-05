import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { useTranslation } from 'react-i18next';

const mockedArticles = [
  {
    id: '1',
    title: 'Cómo aprender React rápidamente',
    date: '2024-04-20',
    wordCount: 1200,
    status: 'published',
    tone: 'informativo',
    type: 'guía',
    language: 'es',
  },
  {
    id: '2',
    title: 'Los mejores consejos para productividad',
    date: '2024-04-18',
    wordCount: 800,
    status: 'draft',
    tone: 'motivacional',
    type: 'lista',
    language: 'es',
  },
  {
    id: '3',
    title: 'Análisis del mercado tecnológico 2024',
    date: '2024-04-15',
    wordCount: 1500,
    status: 'published',
    tone: 'analítico',
    type: 'análisis',
    language: 'es',
  },
  {
    id: '4',
    title: 'Guía para mejorar tu SEO',
    date: '2024-04-10',
    wordCount: 1000,
    status: 'published',
    tone: 'informativo',
    type: 'guía',
    language: 'es',
  },
];

const tones = ['informativo', 'motivacional', 'analítico'];
const types = ['guía', 'lista', 'análisis'];
const languages = ['es', 'en'];

export default function HistoryPage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    tone: '',
    type: '',
    language: '',
  });
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    setArticles(mockedArticles);
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (a) => new Date(a.date) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (a) => new Date(a.date) <= new Date(filters.dateTo)
      );
    }
    if (filters.tone) {
      filtered = filtered.filter((a) => a.tone === filters.tone);
    }
    if (filters.type) {
      filtered = filtered.filter((a) => a.type === filters.type);
    }
    if (filters.language) {
      filtered = filtered.filter((a) => a.language === filters.language);
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
    console.log('Edit article', id);
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

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">{t('DateFrom')}</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t('DateTo')}</label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t('Tone')}</label>
          <select
            name="tone"
            value={filters.tone}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">{t('All')}</option>
            {tones.map((tone) => (
              <option key={tone} value={tone}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">{t('Type')}</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">{t('All')}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">{t('Language')}</label>
          <select
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">{t('All')}</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section>
        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t('NoArticlesFound')}
          </p>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="mb-4 border rounded-md p-4 bg-white dark:bg-gray-800 shadow-sm">
              <ArticleCard article={article} />
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
          ))
        )}
      </section>
    </div>
  );
}
