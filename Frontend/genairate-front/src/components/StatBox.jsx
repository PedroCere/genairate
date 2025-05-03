import { useState } from 'react';

export default function StatBox({ title, value, color = 'primary', progress, comparison, icon }) {
  const colors = {
    primary: 'bg-blue-100 text-blue-700',
    accent: 'bg-purple-100 text-purple-700',
    success: 'bg-green-100 text-green-700',
  };

  const progressBarColor = {
    primary: 'bg-blue-500',
    accent: 'bg-purple-500',
    success: 'bg-green-500',
  };

  const [showComparison, setShowComparison] = useState(true);

  return (
    <div className={`${colors[color]} p-6 rounded-2xl shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {progress !== undefined && (
        <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
          <div
            className={`${progressBarColor[color]} h-2 rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {comparison !== undefined && showComparison && (
        <p
          className={`mt-2 text-sm font-semibold ${
            comparison >= 0 ? 'text-green-600' : 'text-red-600'
          } cursor-pointer`}
          title="Click para ocultar comparación"
          onClick={() => setShowComparison(false)}
        >
          {comparison >= 0 ? '↑' : '↓'} {Math.abs(comparison)}%
        </p>
      )}
    </div>
  );
}
