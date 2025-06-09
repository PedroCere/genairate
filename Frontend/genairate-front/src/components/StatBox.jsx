export default function StatBox({ title, value, change, icon: Icon, isPositive }) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p
        className={`text-xs ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
      >
        {isPositive ? '↑' : '↓'} {change}%
      </p>
    </div>
  );
}
