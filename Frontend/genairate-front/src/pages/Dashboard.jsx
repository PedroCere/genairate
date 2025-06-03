import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InspirationModal from '../components/common/modals/InspirationModal.jsx';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showInspo, setShowInspo] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-gray-900 dark:text-white">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          {t('WelcomeTo')} <span className="text-primary">GenAIrate</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          {t('GenerateArticles')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-14">
        <button
          className="bg-primary text-black dark:text-black font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 hover:bg-cyan-700 transition duration-200"
          onClick={() => navigate('/editor')}
        >
          ✍️ {t('NewArticle')}
        </button>

        <button
          className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          onClick={() => alert(t('TemplatesComingSoon'))}
        >
          🧩 {t('ExploreTemplates')}
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 mb-20">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('RecentWorks')}</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
            <li>✍️ Cómo escribir mejor con IA</li>
            <li>🧠 Guía de estructura para artículos de blog</li>
            <li>📈 Tips de estilo SEO</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('CommunityBlogs')}</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
            <li>📚 10 ideas para blog en mayo</li>
            <li>👀 Lo más leído esta semana</li>
            <li>🚀 Cómo conseguir más vistas</li>
          </ul>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-3 text-yellow-900 dark:text-yellow-100">🧠 {t('NeedInspiration') || '¿Necesitás inspiración?'}</h3>
            <p className="text-sm text-yellow-900 dark:text-yellow-100 mb-5">
              Recibí ideas de escritura únicas con solo un clic.
            </p>
          </div>
          <button
            onClick={() => setShowInspo(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-full transition duration-200"
          >
            ✨ {t('InspireMe') || 'Inspírame'}
          </button>
        </div>
      </div>

      {showInspo && <InspirationModal onClose={() => setShowInspo(false)} />}

      <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>© {new Date().getFullYear()} GenAIrate. {t('GenerativeAIOffline')}.</p>
        <p className="mt-1">
          {t('MadeWithLocal')} — <a href="#" className="underline hover:text-primary">v0.1.0</a>
        </p>
      </footer>
    </div>
  );
}
