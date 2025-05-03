import { motion } from 'framer-motion';
import { FiEdit, FiDownload, FiTrash2, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

function getStatusBadge(status) {
  switch (status) {
    case 'draft':
      return { text: 'Borrador', color: 'bg-yellow-300 text-yellow-800' };
    case 'published':
      return { text: 'Publicado', color: 'bg-green-300 text-green-800' };
    case 'optimized':
      return { text: 'Optimizado', color: 'bg-blue-300 text-blue-800' };
    default:
      return { text: 'Desconocido', color: 'bg-gray-300 text-gray-800' };
  }
}

function readingTime(words) {
  const wordsPerMinute = 200;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

export default function ArticleCard({ article, className }) {
  const statusBadge = getStatusBadge(article.status);
  const readTime = readingTime(article.wordCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all relative ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex space-x-4">
          {/* Thumbnail or placeholder */}
          {article.thumbnail ? (
            <img src={article.thumbnail} alt="Thumbnail" className="w-16 h-16 rounded-md object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
              <FiAlertCircle size={24} />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-text dark:text-white mb-1">{article.title}</h3>
            <div className="flex items-center space-x-2 text-secondary dark:text-gray-400 text-sm">
              <span>{new Date(article.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{article.wordCount} palabras</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiClock /> {readTime} min
              </span>
            </div>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadge.color}`}>
              {statusBadge.text}
            </span>
            {article.editProgress !== undefined && (
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${article.editProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
        {/* Quick action icons */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity">
          <button title="Editar" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiEdit />
          </button>
          <button title="Exportar" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiDownload />
          </button>
          <button title="Eliminar" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-red-600">
            <FiTrash2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
