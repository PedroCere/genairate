import ArticleCard from '../components/ArticleCard';
import EmptyState from '../components/EmptyState';
import StatBox from '../components/StatBox';
import { FaStar, FaPenFancy } from 'react-icons/fa';

const articles = [
  {
    id: 1,
    title: 'Cómo escribir contenido efectivo con IA',
    date: '2024-05-05',
    wordCount: 850,
    status: 'published',
  },
  {
    id: 2,
    title: 'Guía completa de SEO para blogs',
    date: '2024-05-10',
    wordCount: 450,
    status: 'draft',
  },
];

const highlights = [
  {
    title: 'Cómo destacar en contenido web este mes',
    author: 'Comunidad GenAirate',
    date: '3/5/2024',
  },
  {
    title: 'Técnicas de escritura más leídas',
    author: 'Laura P.',
    date: '30/4/2024',
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 relative text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">GenAirate</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatBox title="Total artículos" value={3} change={15} isPositive={true} />
          <StatBox title="Total palabras" value={1500} change={-5} isPositive={false} />
          <StatBox title="Última edición" value={'N/A'} change={0} isPositive={true} />
        </div>

        <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-4">Trabajos recientes</h2>
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Right */}
      <aside className="hidden lg:block space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Blogs de la comunidad</h3>
          <div className="space-y-4">
            {highlights.map((item, idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.author} • {item.date}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-gray-800 rounded-xl p-5 shadow">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Escribe en GenAirate</h4>
          </div>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li><FaPenFancy className="inline mr-2 text-gray-500 dark:text-gray-400" /> Guía de nuevos escritores</li>
            <li><FaPenFancy className="inline mr-2 text-gray-500 dark:text-gray-400" /> Consejos para escribir</li>
            <li><FaPenFancy className="inline mr-2 text-gray-500 dark:text-gray-400" /> Cómo ampliar tu audiencia</li>
          </ul>
          <button className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition text-sm">
            Empezar a escribir
          </button>
        </section>
      </aside>

      {/* Floating Button */}
      <button className="fixed bottom-6 right-6 bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition z-10">
        + Nuevo artículo
      </button>
    </div>
  );
}
