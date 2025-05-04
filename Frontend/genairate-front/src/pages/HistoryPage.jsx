import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';

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
    // Use mocked data for now
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
    // Implement navigation or modal to view article
  }

  function handleEdit(id) {
    console.log('Edit article', id);
    // Implement navigation to editor page with article id
  }

  function handleDuplicate(id) {
    console.log('Duplicate article', id);
    // Implement duplication logic
  }

  function handleDelete(id) {
    console.log('Delete article', id);
    // Implement delete logic with confirmation
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-8">
        Historial de artículos generados
      </h1>

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Fecha desde</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Fecha hasta</label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tono</label>
          <select
            name="tone"
            value={filters.tone}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Todos</option>
            {tones.map((tone) => (
              <option key={tone} value={tone}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Tipo</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Todos</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Idioma</label>
          <select
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Todos</option>
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
            No se encontraron artículos con los filtros seleccionados.
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
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(article.id)}
                  className="text-green-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDuplicate(article.id)}
                  className="text-yellow-600 hover:underline"
                >
                  Duplicar
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
