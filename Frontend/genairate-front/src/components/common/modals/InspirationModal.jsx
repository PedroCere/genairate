import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inspImage from '../../../assets/insp.jpg';

export default function InspirationModal({ onClose }) {
  const navigate = useNavigate();

  const inspirationData = [
    {
      type: 'prompt',
      title: 'Prompt Creativo',
      content: 'Imagina que una IA se enamora de su usuario.',
      image: inspImage,
      tone: 'romántico',
      theme: 'relaciones humano-máquina',
    },
    {
      type: 'title',
      title: 'Idea de Título',
      content: 'Cómo la IA puede ayudarte a tomar decisiones difíciles',
      image: inspImage,
      tone: 'reflexivo',
      theme: 'desarrollo personal',
    },
    {
      type: 'scene',
      title: 'Escena visual',
      content: 'Escribe lo que ocurre justo antes de esta imagen.',
      image: inspImage,
      tone: 'contemplativo',
      theme: 'naturaleza y emociones',
    }
  ];

  const [inspo, setInspo] = useState(() => {
    const saved = localStorage.getItem('savedInspiration');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        image: parsed.image || inspImage, // fallback si es null
      };
    }
    return inspirationData[Math.floor(Math.random() * inspirationData.length)];
  });

  const saveForLater = () => {
    const payload = {
      ...inspo,
      image: typeof inspo.image === 'string' ? inspo.image : null
    };
    localStorage.setItem('savedInspiration', JSON.stringify(payload));
    alert('Guardado para después ✅');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Mi inspiración de hoy: "${inspo.content}" — desde GenAIrate`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleGenerate = () => {
    alert(`Generando artículo con la inspiración: "${inspo.content}" (simulado)`);
    navigate('/editor');
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl text-center max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">{inspo.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{inspo.content}</p>
      {inspo.image && (
        <img
          src={inspo.image}
          alt="Inspiración visual"
          className="rounded-lg mb-4 max-h-48 w-full object-cover"
        />
      )}

      <div className="space-y-2">
        <button onClick={handleGenerate} className="w-full bg-blue-500 text-white py-2 rounded-lg">
          🧠 Generar artículo
        </button>
        <button onClick={saveForLater} className="w-full bg-gray-200 dark:bg-gray-700 py-2 rounded-lg">
          💾 Guardar para después
        </button>
        <button onClick={shareOnTwitter} className="w-full bg-green-400 text-white py-2 rounded-lg">
          🐦 Compartir
        </button>
        <button onClick={onClose} className="text-sm mt-3 text-gray-500 hover:underline">
          Cerrar
        </button>
      </div>
    </div>
  );
}
