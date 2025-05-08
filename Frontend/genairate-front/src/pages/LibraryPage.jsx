import { NavLink } from "react-router-dom";
import { FaBookmark, FaRegCircleCheck } from "react-icons/fa6";
import { PiBookOpenTextDuotone } from "react-icons/pi";

const articles = [
  {
    id: 1,
    title: "Cómo usar GenAIrate sin conexión",
    summary: "Descubrí cómo generar artículos offline de forma efectiva.",
    date: "2024-05-01",
    status: "guardado",
  },
  {
    id: 2,
    title: "Técnicas de escritura con IA",
    summary: "Explorá las herramientas más populares y cómo aplicarlas.",
    date: "2024-04-25",
    status: "leído",
  },
];

const recommended = [
  { title: "Escribir títulos irresistibles con IA", tag: "Copywriting" },
  { title: "Optimización SEO para 2025", tag: "SEO" },
  { title: "Cómo estructurar listas efectivas", tag: "Estilo" },
  { title: "Errores comunes al usar IA", tag: "Guías" },
  { title: "Guía rápida para generar resúmenes", tag: "Tips" },
  { title: "¿Cuándo usar tono formal o casual?", tag: "Tono" },
];

export default function LibraryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-900 dark:text-white">
      {/* Artículos */}
      <main className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <FaBookmark className="text-primary" />
          Biblioteca personal
        </h1>

        {articles.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Todavía no guardaste ningún artículo.
          </p>
        ) : (
          <div className="space-y-5">
            {articles.map(({ id, title, summary, date, status }) => (
              <NavLink
                key={id}
                to={`/article/${id}`}
                className="block group p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                    {title}
                  </h2>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      status === "guardado"
                        ? "bg-primary/10 text-primary"
                        : "bg-green-200/10 text-green-400"
                    }`}
                  >
                    {status === "guardado" ? "Guardado" : "Leído"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {status === "guardado" ? (
                    <PiBookOpenTextDuotone className="text-base" />
                  ) : (
                    <FaRegCircleCheck className="text-base" />
                  )}
                  {new Date(date).toLocaleDateString()}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </main>

      {/* Recomendaciones */}
      <aside className="hidden md:block">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-primary">Recomendaciones</h2>
          <ul className="space-y-4 text-sm">
            {recommended.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-1 hover:text-primary transition-colors cursor-pointer"
              >
                <NavLink to="#" className="font-medium leading-snug">
                  {item.title}
                </NavLink>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  #{item.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
