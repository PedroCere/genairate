import Navbar from "../components/common/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full space-y-10 text-center">
          <header>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Bienvenido a <span className="text-primary">GenAIrate</span>
            </h1>
            <p className="text-secondary text-lg mt-4">
              Generá artículos optimizados con inteligencia artificial, directamente desde tu máquina.
            </p>
          </header>

          <section className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              className="bg-primary hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-xl transition"
              onClick={() => alert("Función de nuevo artículo")}
            >
              + Nuevo artículo
            </button>
            <button
              className="border border-primary text-primary hover:bg-cyan-900 font-semibold px-6 py-3 rounded-2xl transition"
              onClick={() => alert("Próximamente")}
            >
              Explorar plantillas
            </button>
          </section>

          <footer className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-secondary">
              💡 Todo lo que generás se queda en tu equipo. GenAIrate funciona 100% offline.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
