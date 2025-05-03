import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getRecentArticles } from '../services/ContentService';

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

function StyleChip({ icon, value, bgColor }) {
  return (
    <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium bg-${bgColor} text-white`}>
      <span>{icon}</span>
      <span>{value}</span>
    </div>
  );
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
      {/* Bloque estilo */}
      <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tu estilo</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tono preferido: <span className="font-medium text-gray-800 dark:text-white">{preferredTone}</span>
        </p>
        <div className="flex gap-3 flex-wrap">
          <StyleChip icon="✍️" value={`${totalWords} palabras`} bgColor="cyan-600" />
          <StyleChip icon="⭐" value={`${totalArticles} artículos`} bgColor="purple-600" />
        </div>
      </div>

      {/* Bloque artículos */}
      <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tus artículos recientes</h3>
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            Ver todo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {articlesLoading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        ) : articlesError ? (
          <div className="text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-200 p-4 rounded-lg">
            Error cargando artículos: {articlesError.message}
          </div>
        ) : (
          <div className="space-y-4">
            {(articles || []).slice(0, 4).map((a, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all space-y-1 relative">
                <h4 className="font-semibold text-gray-800 dark:text-white">{a.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(a.date)} · {a.words} palabras · {a.tone}
                </p>
                {a.isIaSuggested && (
                  <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    IA sugerido
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
