import React, { useState, useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MOCK_DATA = {
  views: 124,
  reads: 42,
  timeline: [10, 24, 18, 35, 37],
};

export default function AnalyticsPage() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setTimeout(() => setStats(MOCK_DATA), 500);
  }, []);

  const barData = {
    labels: ['1 May', '2 May', '3 May', '4 May', '5 May'],
    datasets: [
      {
        label: t('Views'),
        data: stats?.timeline || [],
        backgroundColor: '#60A5FA', // Tailwind blue-400
        borderRadius: 6,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} ${t('views').toLowerCase()}`;
          },
        },
      },
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
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">{t('YourAnalytics')}</h1>
        <p className="text-sm text-gray-400">
          {t('LastUpdated')} · {new Date().toLocaleDateString(i18n.language)}
        </p>
      </div>

      <div className="flex justify-between gap-4 text-center mb-6">
        <div className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <Eye className="mx-auto mb-1 text-blue-500" size={24} />
          <p className="text-2xl font-bold">{stats?.views || 0}</p>
          <p className="text-sm text-gray-500">{t('TotalViews')}</p>
        </div>

        <div className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <BookOpen className="mx-auto mb-1 text-green-500" size={24} />
          <p className="text-2xl font-bold">{stats?.reads || 0}</p>
          <p className="text-sm text-gray-500">{t('TotalReads')}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <h3 className="text-sm font-medium mb-2">{t('ViewsOverTime')}</h3>
        {stats ? (
          <Bar data={barData} options={options} height={220} />
        ) : (
          <p className="text-center text-gray-400">{t('Loading')}...</p>
        )}
      </div>
    </div>
  );
}
