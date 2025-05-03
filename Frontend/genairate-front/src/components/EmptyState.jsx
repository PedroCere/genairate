import React from 'react';

export default function EmptyState({ userName, onCreateArticle, onViewTutorial }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center bg-white rounded-2xl shadow-md">
      <img
        src="/assets/ai-writing-illustration.svg"
        alt="AI Writing Illustration"
        className="w-48 h-48 mx-auto"
      />
      <h2 className="text-2xl font-semibold text-gray-800">
        ¡Hola {userName}! Presiona el botón verde para crear tu primer artículo
      </h2>
      <div className="flex gap-4">
        <button
          onClick={onCreateArticle}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          + Nuevo artículo
        </button>
        <button
          onClick={onViewTutorial}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Ver tutorial
        </button>
      </div>
    </div>
  );
}
