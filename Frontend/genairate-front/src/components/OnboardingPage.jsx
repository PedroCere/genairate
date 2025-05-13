import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  "Tecnología",
  "Negocios",
  "Salud",
  "Educación",
  "Ciencia",
  "Finanzas",
  "Viajes",
  "Deportes",
  "Música",
  "Arte",
  "Historia",
  "Filosofía",
  "Psicología",
  "Desarrollo personal",
  "Noticias",
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleTopic = (topic) => {
    setSelected((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleContinue = () => {
    // Aquí podrías enviar al backend o contexto
    console.log("Temas seleccionados:", selected);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">¿Qué temas te interesan?</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Seleccioná al menos 5 temas para personalizar tu experiencia.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`border rounded-full px-4 py-2 text-sm transition ${
              selected.includes(topic)
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            } hover:shadow-md`}
          >
            {topic}
          </button>
        ))}
      </div>
      <button
        onClick={handleContinue}
        disabled={selected.length < 5}
        className={`px-6 py-3 rounded-full font-semibold transition ${
          selected.length < 5
            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
            : "bg-primary text-black dark:text-white border border-black dark:border-white hover:bg-cyan-600"
        }`}
      >
        Continuar
      </button>
    </div>
  );
}
