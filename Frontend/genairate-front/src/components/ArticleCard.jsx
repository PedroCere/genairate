import { FiClock } from 'react-icons/fi';

export default function ArticleCard({ article }) {
  return (
    <div className="group transition-all duration-200 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-gray-100 group-hover:underline">
            {article.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date(article.date).toLocaleDateString()} • {article.wordCount} palabras •{' '}
            <span className="inline-flex items-center gap-1">
              <FiClock /> {Math.ceil(article.wordCount / 200)} min lectura
            </span>
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              article.status === 'published'
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
            }`}
          >
            {article.status === 'published' ? 'Publicado' : 'Borrador'}
          </span>
        </div>
      </div>
    </div>
  );
}
