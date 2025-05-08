import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit3, FiTrash2, FiUpload } from "react-icons/fi";

export default function StoriesPage() {
  const navigate = useNavigate();

  const [stories, setStories] = useState([
    {
      id: "1",
      title: "Cómo escribir contenido efectivo con IA",
      date: "2024-05-01",
      status: "borrador",
    },
    {
      id: "2",
      title: "Guía completa de SEO para blogs",
      date: "2024-04-28",
      status: "publicado",
    },
  ]);

  const publicarStory = (id) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, status: "publicado" } : story
      )
    );
  };

  const editarStory = (id) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id && story.status === "publicado"
          ? { ...story, status: "borrador" }
          : story
      )
    );
    navigate(`/editor/${id}`);
  };

  const eliminarStory = (id) => {
    setStories((prev) => prev.filter((story) => story.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <FiEdit3 className="text-primary" />
        Tus historias
      </h1>

      {stories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No tenés historias todavía. Empezá a escribir en el editor.
        </p>
      ) : (
        <div className="space-y-4">
          {stories.map(({ id, title, date, status }) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-2 sm:mb-0">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {status === "publicado" ? (
                    <span className="text-green-400">Publicado</span>
                  ) : (
                    <span className="text-yellow-400">Borrador</span>
                  )}{" "}
                  • {new Date(date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => editarStory(id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition"
                >
                  <FiEdit3 />
                  Editar
                </button>

                {status === "borrador" && (
                  <button
                    onClick={() => publicarStory(id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-500/10 text-green-500 hover:bg-green-500/20 transition"
                  >
                    <FiUpload />
                    Publicar
                  </button>
                )}

                <button
                  onClick={() => eliminarStory(id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                >
                  <FiTrash2 />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
