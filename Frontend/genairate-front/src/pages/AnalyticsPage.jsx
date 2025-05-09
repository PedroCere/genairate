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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MOCK_DATA = {
  views: 42,
  reads: 10,
  timeline: [12, 18, 16, 28, 40], 
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats(MOCK_DATA);
    }, 500);
  }, []);

  if (!stats) {
    return <div className="text-center py-10 text-gray-700 dark:text-gray-300">Cargando métricas...</div>;
  }

  const barData = {
    labels: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5'],
    datasets: [
      {
        label: 'Views',
        data: stats.timeline,
        backgroundColor: 'rgba(34, 197, 94, 0.9)',
        borderRadius: 4,
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
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-center text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Your story stats</h1>

      <p className="text-lg text-gray-500 dark:text-gray-400 mb-1">Monthly</p>
      <p className="text-sm text-gray-400 mb-8">May 1, 2025 – May 5, 2025 (UTC) ・ Updated hourly</p>

      <div className="flex justify-center gap-20 mb-10">
        <div>
          <p className="text-4xl font-bold">{stats.views}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{stats.reads}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Reads</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto border-t border-gray-200 dark:border-gray-700 pt-6">
        <Bar data={barData} options={options} height={200} />
        <div className="flex justify-end text-xs text-gray-400 mt-2 pr-2">
          <span className="mr-4">● Views</span>
        </div>
      </div>
    </div>
  );
}
