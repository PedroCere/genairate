import { useState } from "react";
import { FiHelpCircle, FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "¿Cómo empiezo a escribir un artículo?",
    answer:
      "Hacé clic en el botón 'Write' desde la barra superior. Serás llevado al editor, donde podés escribir desde cero o generar contenido automáticamente usando IA.",
  },
  {
    question: "¿Dónde se guardan mis artículos?",
    answer:
      "Los artículos se guardan automáticamente en tu historial. Podés acceder a ellos desde el menú desplegable → 'Stories' para borradores, o 'Library' para artículos guardados o leídos.",
  },
  {
    question: "¿Cómo publico un artículo?",
    answer:
      "Entrá a 'Stories', buscá tu artículo en borrador y tocá 'Publicar'. Esto cambiará su estado a publicado, aunque sigue siendo editable.",
  },
  {
    question: "¿Puedo usar GenAIrate sin internet?",
    answer:
      "Sí. GenAIrate funciona completamente offline en tu PC, usando modelos de lenguaje locales como Phi-2 o Mistral. Asegurate de tener la app levantada localmente.",
  },
  {
    question: "¿Qué hace el botón 'AI' en el editor?",
    answer:
      "Te permite acceder a herramientas inteligentes: reescritura, resúmenes, sugerencias de títulos y más. Todas las acciones son procesadas localmente por IA.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0); // Primer ítem abierto

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <FiHelpCircle className="text-primary" />
        Centro de ayuda
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Respondemos tus dudas más comunes sobre cómo usar GenAIrate de forma simple, rápida y sin conexión.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span>{faq.question}</span>
              <FiChevronDown
                className={`transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-700 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
