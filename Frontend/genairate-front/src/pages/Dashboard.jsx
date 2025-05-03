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

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    setArticlesLoading(true);
    getRecentArticles(user.id)
      .then(data => {
        setArticles(data);
        setArticlesError(null);
      })
      .catch(error => {
        setArticlesError(error);
      })
      .finally(() => {
        setArticlesLoading(false);
      });
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--color-dashboard-bg)', color: 'var(--color-text)' }}>
        <div className="loader">Loading...</div>
        <p className="mt-4" style={{ color: 'var(--color-secondary)' }}>Cargando datos de usuario...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-dashboard-bg)', color: 'var(--color-text)' }}>
        <p className="text-red-500">Error de autenticación. Redirigiendo...</p>
      </div>
    );
  }

  function StyleChip({ icon, label, value, bgColor }) {
    return (
      <div className={`flex items-center gap-2 rounded-full px-3 py-1`} style={{ backgroundColor: `var(--color-${bgColor})`, opacity: 0.2 }}>
        <span>{icon}</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</span>
      </div>
    );
  }

  function DashboardContent() {
    const totalWords = user.stats?.totalWords ?? 0;
    const totalArticles = user.stats?.totalArticles || 0;
    const preferredTone = "Creativo"; // Hardcoded as per guide

    return (
      <div className="space-y-8">
        <section className="p-6 rounded-2xl shadow-xl space-y-4" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}>
          <h3 className="text-2xl font-semibold dark:text-[#FF9B8A]" style={{ color: 'var(--color-accent)' }}>Tu estilo</h3>
          <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>Tono preferido: <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{preferredTone}</span></p>
          <div className="flex gap-4">
            <StyleChip icon="✍️" label="Palabras totales" value={totalWords} bgColor="cyan-600" />
            <StyleChip icon="⭐" label="Artículos totales" value={totalArticles} bgColor="purple-600" />
          </div>
        </section>

        <section className="p-6 rounded-2xl shadow-xl space-y-4" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold dark:text-[#FF9B8A]" style={{ color: 'var(--color-accent)' }}>Tus artículos recientes</h3>
            <button className="font-semibold text-sm flex items-center gap-1 transition dark:text-[#FF9B8A]" style={{ color: 'var(--color-accent)' }}>
              Ver todo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {articlesLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 rounded-2xl" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.2 }} />
              ))}
            </div>
          ) : articlesError ? (
            <div className="p-4 rounded-lg" style={{ color: 'var(--color-danger)', backgroundColor: 'var(--color-danger)', opacity: 0.2 }}>
              Error cargando artículos: {articlesError.message}
            </div>
          ) : (
            <div className="space-y-6">
              {(articles || []).slice(0, 4).map((a, i) => (
                <div key={i} className="p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col gap-2 relative" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-text)' }}>
                  <h4 className="font-semibold dark:text-[#FF9B8A]">{a.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{formatDate(a.date)} · {a.words} palabras · {a.tone}</p>
                  {a.isIaSuggested && (
                    <span className="absolute top-4 right-4" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', boxShadow: '0 0 5px var(--color-primary)' }}>
                      IA sugerido
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <section>
      <DashboardContent />
    </section>
  );
}
