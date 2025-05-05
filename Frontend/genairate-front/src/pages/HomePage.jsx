import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

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
          onClick={() => window.location.href = '/editor'}
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

      <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-5 mt-10 shadow-sm">
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          <span className="mr-1">💡</span>
          <span className="font-medium">{t('GenAIrateOffline')}</span> {t('ContentStaysLocal')}
        </p>
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
