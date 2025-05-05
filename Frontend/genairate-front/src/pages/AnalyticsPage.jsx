import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { contentService } from '../services/ContentService';
import StatBox from '../components/StatBox';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const demoArticles = [
  { id: '1', type: 'guía' },
  { id: '2', type: 'lista' },
  { id: '3', type: 'análisis' },
  { id: '4', type: 'guía' },
  { id: '5', type: 'lista' },
];

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [articlesByType, setArticlesByType] = useState({});

  useEffect(() => {
    async function fetchAnalytics() {
      const data = await contentService.getAnalytics();
      setAnalytics(data);

     
      const typeCounts = demoArticles.reduce((acc, article) => {
        acc[article.type] = (acc[article.type] || 0) + 1;
        return acc;
      }, {});
      setArticlesByType(typeCounts);
    }
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div className="text-center py-10">Cargando métricas...</div>;
  }

 
  const toneEntries = Object.entries(analytics.toneDistribution);
  const mostUsedTone = toneEntries.reduce((max, entry) => (entry[1] > max[1] ? entry : max), ['', 0])[0];

 
  const weeklyData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7'],
    datasets: [
      {
        label: 'Longitud por semana (palabras)',
        data: analytics.weeklyProgress,
        backgroundColor: 'rgba(37, 99, 235, 0.7)', 
      },
    ],
  };

  
  const articleTypes = Object.keys(articlesByType);
  const articleTypeCounts = Object.values(articlesByType);
  const articlesByTypeData = {
    labels: articleTypes,
    datasets: [
      {
        label: 'Artículos por tipo',
        data: articleTypeCounts,
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', 
          'rgba(16, 185, 129, 0.7)', 
          'rgba(234, 179, 8, 0.7)',  
        ],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-8">Métricas de contenido generado</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <StatBox title="Palabras promedio por artículo" value={analytics.avgWords} />
        <StatBox title="Tono más usado" value={mostUsedTone.charAt(0).toUpperCase() + mostUsedTone.slice(1)} />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Longitud por semana</h2>
        <div className="max-w-xl mx-auto">
          <Bar data={weeklyData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Artículos por tipo</h2>
        <div className="max-w-lg mx-auto">
          <Pie data={articlesByTypeData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </section>
    </div>
  );
}
