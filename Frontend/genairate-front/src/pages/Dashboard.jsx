import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InspirationModal from '../components/common/modals/InspirationModal.jsx';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showInspo, setShowInspo] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-900 dark:text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          {t('WelcomeTo')} <span className="text-primary">GenAIrate</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {t('GenerateArticles')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
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

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {/* Card: Recent Works */}
        <div className="bg-surface-card border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{t('RecentWorks')}</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>✍️ Cómo escribir mejor con IA</li>
            <li>🧠 Guía de estructura para artículos de blog</li>
            <li>📈 Tips de estilo SEO</li>
          </ul>
        </div>

        {/* Card: Community Highlights */}
        <div className="bg-surface-card border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{t('CommunityBlogs')}</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>📚 10 ideas para blog en mayo</li>
            <li>👀 Lo más leído esta semana</li>
            <li>🚀 Cómo conseguir más vistas</li>
          </ul>
        </div>

        {/* Card: Inspiration */}
        <div className="bg-yellow-100 dark:bg-yellow-800 border border-yellow-300 dark:border-yellow-700 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">🧠 {t('NeedInspiration') || '¿Necesitás inspiración?'}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-100 mb-4">
              Recibí ideas de escritura únicas con solo un clic.
            </p>
          </div>
          <button
            onClick={() => setShowInspo(true)}
            className="mt-auto bg-yellow-400 text-black font-medium py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
          >
            {t('InspireMe') || 'Inspírame'}
          </button>
        </div>
      </div>

      {showInspo && <InspirationModal onClose={() => setShowInspo(false)} />}

      <footer className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>© {new Date().getFullYear()} GenAIrate. {t('GenerativeAIOffline')}.</p>
        <p className="mt-1">
          {t('MadeWithLocal')} — <a href="#" className="underline hover:text-primary">v0.1.0</a>
        </p>
      </footer>
    </div>
  );
}
