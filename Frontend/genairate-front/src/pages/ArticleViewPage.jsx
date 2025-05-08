import { useParams } from "react-router-dom";

const mockArticles = {
  1: {
    title: "Cómo usar GenAIrate sin conexión",
    introduction:
      "En esta guía, exploraremos cómo aprovechar el poder de GenAIrate para generar contenido de blog de alta calidad, sin necesidad de conexión a internet.",
    sections: [
      {
        subtitle: "Configuración del entorno local",
        content:
          "Instalá el backend con Spring Boot y asegurate de tener FastAPI y el modelo Phi-2 configurados correctamente en tu máquina.",
      },
      {
        subtitle: "Usando el generador desde el editor",
        content:
          "Accedé al editor y escribí tu idea inicial. El sistema sugerirá secciones automáticamente y permitirá editar o mejorar con IA en tiempo real.",
      },
      {
        subtitle: "Exportación y publicación",
        content:
          "Una vez finalizado el artículo, podés exportarlo a PDF o Markdown, o guardarlo en tu historial para futuras ediciones.",
      },
    ],
    conclusion:
      "GenAIrate es ideal para bloggers y redactores que desean independencia total de plataformas externas. Probalo hoy.",
  },
  2: {
    title: "Técnicas de escritura con IA",
    introduction:
      "La inteligencia artificial puede ser tu mejor aliada al momento de escribir. Te mostramos cómo integrarla en tu flujo creativo.",
    sections: [
      {
        subtitle: "Autocompletado contextual",
        content:
          "A medida que escribís, el sistema puede sugerir frases o párrafos enteros basados en el estilo y contenido anterior.",
      },
      {
        subtitle: "Reescritura inteligente",
        content:
          "Seleccioná un párrafo y pedí una reescritura: más formal, más persuasiva o más breve. Ideal para mejorar impacto.",
      },
      {
        subtitle: "Título y subtítulos automáticos",
        content:
          "La IA puede sugerir títulos llamativos y subtítulos claros para cada sección, optimizando la legibilidad y el SEO.",
      },
    ],
    conclusion:
      "Estas herramientas no reemplazan tu creatividad, la potencian. Experimentá y encontrá tu estilo asistido.",
  },
};

export default function ArticleViewPage() {
  const { id } = useParams();
  const article = mockArticles[id];

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-red-500">Artículo no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{article.introduction}</p>

      {article.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary">{section.subtitle}</h2>
          <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
        </div>
      ))}

      <div className="mt-8 border-t pt-4">
        <p className="italic text-gray-600 dark:text-gray-400">{article.conclusion}</p>
      </div>
    </div>
  );
}
