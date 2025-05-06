import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InspirationModal from '../components/common/modals/InspirationModal.jsx';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showInspo, setShowInspo] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-900 dark:text-white text-center">
      <h1 className="text-4xl font-extrabold mb-4">
        {t('WelcomeTo')} <span className="text-primary">GenAIrate</span>
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        {t('GenerateArticles')}<br />
        {t('OfflineNoLimits')}
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <button
          className="bg-primary text-black dark:text-white border border-black dark:border-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition hover:bg-cyan-600"
          onClick={() => navigate('/editor')}
        >
          {t('NewArticle')}
        </button>

        <button
          className="bg-primary text-black dark:text-white border border-black dark:border-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition hover:bg-cyan-600"
          onClick={() => alert(t('TemplatesComingSoon'))}
        >
          {t('ExploreTemplates')}
        </button>
      </div>

      <button
        onClick={() => setShowInspo(true)}
        className="mt-8 bg-yellow-400 text-black px-5 py-3 rounded-full shadow hover:bg-yellow-500"
      >
        🧠 Necesito inspiración
      </button>

      {showInspo && (
        <InspirationModal onClose={() => setShowInspo(false)} />
      )}

      {/* NUEVAS FUNCIONALIDADES MOCK */}
      <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
        <div className="bg-surface-card border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{t('RecentWorks')}</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>✍️ Cómo escribir mejor con IA</li>
            <li>🧠 Guía de estructura para artículos de blog</li>
            <li>📈 Tips de estilo SEO</li>
          </ul>
        </div>

        <div className="bg-surface-card border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{t('CommunityBlogs')}</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>📚 10 ideas para blog en mayo</li>
            <li>👀 Lo más leído esta semana</li>
            <li>🚀 Cómo conseguir más vistas</li>
          </ul>
        </div>
      </div>

      <footer className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>© {new Date().getFullYear()} GenAIrate. {t('GenerativeAIOffline')}.</p>
        <p className="mt-1">
          {t('MadeWithLocal')} — <a href="#" className="underline hover:text-primary">v0.1.0</a>
        </p>
      </footer>
    </div>
  );
}
