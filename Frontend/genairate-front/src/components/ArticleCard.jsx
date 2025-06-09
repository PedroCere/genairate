import React from 'react';

export default function ArticleCard({ article }) {
  return (
    <div className="flex items-start gap-4 border-b pb-4">
      <img src={article.image} alt={article.title} className="w-36 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{article.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{article.description}</p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <img src={article.authorImage} alt={article.author} className="w-5 h-5 rounded-full mr-2" />
          {article.author} • {article.date} • 👁 {article.views} • 💬 {article.comments}
        </div>
      </div>
    </div>
  );
}
