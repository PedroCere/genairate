import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Eye, BookOpen } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MOCK_DATA = {
  views: 42,
  reads: 10,
  timeline: [12, 18, 16, 28, 40],
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => setStats(MOCK_DATA), 500); // Simulación
    };
    fetchData();
  }, []);

  if (!stats) {
    return <div className="text-center py-10 text-gray-700 dark:text-gray-300">📊 Cargando métricas...</div>;
  }

  const barData = {
    labels: ['1 May', '2 May', '3 May', '4 May', '5 May'],
    datasets: [
      {
        label: 'Vistas',
        data: stats.timeline,
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9CA3AF', // gray-400
          stepSize: 10,
        },
        grid: { color: '#E5E7EB' }, // gray-200
      },
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">📈 Estadísticas de tus artículos</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Período: 1–5 de Mayo, 2025 (UTC) ・ Actualizado cada hora
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex items-center gap-4 border border-gray-200 dark:border-gray-700">
          <Eye size={28} className="text-blue-500" />
          <div>
            <p className="text-4xl font-bold">{stats.views}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visualizaciones totales</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex items-center gap-4 border border-gray-200 dark:border-gray-700">
          <BookOpen size={28} className="text-green-500" />
          <div>
            <p className="text-4xl font-bold">{stats.reads}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Lecturas completas</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Tendencia diaria de vistas</h3>
        <Bar data={barData} options={options} height={300} />
        <div className="text-right text-xs text-gray-400 mt-2">● Vistas por día</div>
      </div>
    </div>
  );
}
