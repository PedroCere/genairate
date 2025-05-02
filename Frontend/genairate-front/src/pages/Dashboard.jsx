import Sidebar from '../components/SideBar.jsx';
import Navbar from '../components/NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'react-query';
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

  const { 
    data: articles, 
    isLoading: articlesLoading,
    error: articlesError 
  } = useQuery(
    ['recentArticles', user?.id],
    () => getRecentArticles(user?.id),
    {
      enabled: !!user?.id
    }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E293B] text-white">
        <div className="loader">Loading...</div>
        <p className="mt-4 text-[#94A3B8]">Cargando datos de usuario...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1E293B] text-white">
        <p className="text-red-500">Error de autenticación. Redirigiendo...</p>
      </div>
    );
  }

  function StyleChip({ icon, label, value, bgColor }) {
    return (
      <div className={`flex items-center gap-2 bg-${bgColor} bg-opacity-20 rounded-full px-3 py-1`}>
        <span>{icon}</span>
        <span className="text-sm text-white font-semibold">{value}</span>
      </div>
    );
  }

  function DashboardContent() {
    const totalWords = user.stats?.totalWords ?? 0;
    const totalArticles = user.stats?.totalArticles || 0;
    const preferredTone = "Creativo"; // Hardcoded as per guide

    return (
      <div className="space-y-8">
        <section className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-2xl font-semibold text-[#C084FC]">Tu estilo</h3>
          <p className="text-sm text-[#94A3B8]">Tono preferido: <span className="font-semibold text-white">{preferredTone}</span></p>
          <div className="flex gap-4">
            <StyleChip icon="✍️" label="Palabras totales" value={totalWords} bgColor="cyan-600" />
            <StyleChip icon="⭐" label="Artículos totales" value={totalArticles} bgColor="purple-600" />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-[#06B6D4]">Tus artículos recientes</h3>
            <button className="text-[#06B6D4] hover:text-cyan-400 font-semibold text-sm flex items-center gap-1 transition">
              Ver todo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {articlesLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 bg-[#94A3B8]/20 rounded-2xl" />
              ))}
            </div>
          ) : articlesError ? (
            <div className="text-red-500 p-4 rounded-lg bg-red-900/20">
              Error cargando artículos: {articlesError.message}
            </div>
          ) : (
            <div className="space-y-6">
              {(articles || []).slice(0, 4).map((a, i) => (
                <div key={i} className="bg-[#2C3A50] p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col gap-2 relative">
                  <h4 className="text-white font-semibold">{a.title}</h4>
                  <p className="text-sm text-[#94A3B8]">{formatDate(a.date)} · {a.words} palabras · {a.tone}</p>
                  {a.isIaSuggested && (
                    <span className="absolute top-4 right-4 bg-[#C084FC] text-white text-xs px-2 py-1 rounded-full shadow">
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
    <div className="flex min-h-screen bg-[#1E293B] text-white overflow-hidden">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <div className="px-8 py-6 w-full">
          <Navbar />
        </div>
        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-8">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
