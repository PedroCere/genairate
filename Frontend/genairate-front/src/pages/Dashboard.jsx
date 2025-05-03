import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getRecentArticles } from '../services/ContentService';
import StatBox from '../components/StatBox';
import ArticleCard from '../components/ArticleCard';
import EmptyState from '../components/EmptyState';
import { FiPlus, FiCpu, FiEdit, FiClock } from 'react-icons/fi';

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) + ' h';
  } catch {
    return dateString;
  }
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    setArticlesLoading(true);
    getRecentArticles(user.id)
      .then(setArticles)
      .catch(setArticlesError)
      .finally(() => setArticlesLoading(false));
  }, [user?.id]);

  const handleCreateArticle = () => {
    // Implement navigation or modal to create new article
    alert('Crear nuevo artículo');
  };

  const handleViewTutorial = () => {
    // Implement navigation to tutorial or onboarding
    alert('Ver tutorial');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-text)]">
        <div className="loader">Loading...</div>
        <p className="mt-4 text-gray-500">Cargando datos de usuario...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-red-500">
        <p>Error de autenticación. Redirigiendo...</p>
      </div>
    );
  }

  const totalWords = user.stats?.totalWords ?? 0;
  const totalArticles = user.stats?.totalArticles || 0;
  const preferredTone = "Creativo"; // Static

  return (
    <section className="space-y-8 p-4 md:p-8 bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Header with branding and new article button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <img src="/assets/logo1.png" alt="GenAirate Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-bold text-blue-600 dark:text-gray-100 font-serif">GenAirate</h1>
        </div>
        <button
          onClick={handleCreateArticle}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition shadow-lg"
          title="Nuevo artículo"
        >
          <FiCpu className="text-xl" />
          + Nuevo artículo
        </button>
      </div>

      {/* StatBox section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox
          title="Total artículos"
          value={totalArticles}
          color="primary"
          progress={75} // Example progress
          comparison={15} // Example comparison percentage
          icon={<span role="img" aria-label="document">📄</span>}
        />
        <StatBox
          title="Total palabras"
          value={totalWords}
          color="accent"
          progress={60} // Example progress
          comparison={-5} // Example comparison percentage
          icon={<FiEdit />}
        />
        <StatBox
          title="Última edición"
          value={user.stats?.lastEdit ? formatDate(user.stats.lastEdit) : 'N/A'}
          color="success"
          icon={<FiClock />}
        />
      </div>

      {/* Articles section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 drop-shadow-md">Trabajos recientes</h2>
          <button
            onClick={() => alert('Ver todos los artículos')}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            Ver todo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {articlesLoading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner" />
            ))}
          </div>
        ) : articlesError ? (
          <div className="text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 p-4 rounded-lg shadow-inner">
            Error cargando artículos: {articlesError.message}
          </div>
        ) : articles.length === 0 ? (
          <EmptyState
            userName={user.name || 'Usuario'}
            onCreateArticle={handleCreateArticle}
            onViewTutorial={handleViewTutorial}
          />
        ) : (
          <div className="space-y-4">
            {articles.slice(0, 4).map((article, i) => (
              <ArticleCard key={i} article={article} className="shadow-md rounded-xl" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
