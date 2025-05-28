import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadTrianglesPreset } from "tsparticles-preset-triangles";
import { loadLinksPreset } from "tsparticles-preset-links";
import ScrollReveal from "scrollreveal";

export default function LandingPage({ darkMode, toggleDarkMode }) {
  const [themeIcon, setThemeIcon] = useState("moon");

  useEffect(() => {
    setThemeIcon(document.documentElement.classList.contains("dark") ? "sun" : "moon");
    ScrollReveal().reveal(".reveal", {
      delay: 150,
      distance: "30px",
      origin: "bottom",
      duration: 600,
      reset: false,
    });
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
    setThemeIcon((prev) => (prev === "moon" ? "sun" : "moon"));
  };

  const particlesInit = async (engine) => {
    await loadTrianglesPreset(engine);
    await loadLinksPreset(engine);
  };

  const particlesOptions = {
    preset: darkMode ? "triangles" : "links",
    background: {
      color: { value: "transparent" },
    },
    fullScreen: { enable: false },
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors overflow-hidden">
      {/* Fondo animado siempre */}
      <Particles
        id="bg-anim"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-0 bg-white/60 dark:bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold font-serif tracking-tight">
            <Link to="/">GenAIrate</Link>
          </h1>
          <div className="flex items-center gap-3">
            <Link to="/login" className="border border-black dark:border-white text-black dark:text-white font-semibold px-4 py-2 rounded-xl transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">Iniciar sesión</Link>
            <Link to="/register" className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white font-semibold px-4 py-2 rounded-xl shadow-md transition hover:bg-gray-800 dark:hover:bg-gray-100">Registrarse</Link>
            <button onClick={handleToggle} aria-label="Toggle Dark Mode" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition">
              {themeIcon === "moon" ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14a7 7 0 000-14z" /></svg>
              )}
            </button>
          </div>
        </header>

        {/* Hero */}
        <main className="flex flex-col items-center justify-center text-center px-6 py-20 gap-8">
          <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl reveal">
            Escribí mejor. Más rápido. Con <span className="underline decoration-pink-500 decoration-4 underline-offset-4">ayuda de inteligencia artificial</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-xl reveal">
            GenAIrate es tu asistente para crear textos increíbles en segundos.
            Ideal para artículos, ideas, mensajes y más.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-5 mt-6 max-w-md shadow-md reveal">
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              💡 <span className="font-medium">Asistencia inteligente.</span>{" "}
              Potenciado con modelos avanzados que entienden tu intención.
            </p>
          </div>
        </main>

        {/* Features */}
        <section className="px-6 py-20 bg-gray-50 dark:bg-gray-800 text-center reveal">
          <h3 className="text-3xl font-bold mb-10">¿Por qué GenAIrate?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <FeatureCard title="✍️ Escribí sin bloqueo" desc="Inspirate con prompts inteligentes y sugerencias contextuales." />
            <FeatureCard title="🚀 Acelerá tu proceso" desc="Desde ideas hasta artículos completos en cuestión de segundos." />
            <FeatureCard title="🔍 Personalización total" desc="Adaptá el tono, estilo y enfoque según tu audiencia." />
          </div>
        </section>

        {/* How it works - Mejorado visualmente */}
        <section className="px-6 py-20 text-center bg-white dark:bg-gray-900 reveal">
          <h3 className="text-3xl font-bold mb-10">¿Cómo te ayuda?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left text-lg">
            <Step num="1" text="Elegí el tipo de texto: artículo, tweet, email o post." />
            <Step num="2" text="Escribí una idea o dejá que la AI te proponga una." />
            <Step num="3" text="Ajustá el tono y longitud según tus preferencias." />
            <Step num="4" text="Obtené resultados en tiempo real. Editá, copiá y usalo." />
          </div>
        </section>

        {/* Final Call To Action */}
        <section className="px-6 py-20 text-center reveal">
          <h3 className="text-3xl font-bold mb-6">Tu próxima gran idea empieza acá</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Probalo gratis y descubrí lo que podés crear.</p>
          <Link to="/register" className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-900 dark:hover:bg-gray-200 transition">Crear cuenta</Link>
        </section>

        {/* Footer */}
        <footer className="py-10 text-sm text-center text-gray-500 dark:text-gray-400">
          <div className="h-px w-[80%] mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700 mb-4" />
          © {new Date().getFullYear()} GenAIrate. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

// Subcomponents
const FeatureCard = ({ title, desc }) => (
  <div className="p-6 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-900">
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-700 dark:text-gray-300">{desc}</p>
  </div>
);

const Step = ({ num, text }) => (
  <div className="p-4 border-l-4 border-pink-500 bg-gray-50 dark:bg-gray-800 rounded-md">
    <h5 className="text-2xl font-bold mb-2">Paso {num}</h5>
    <p className="text-gray-700 dark:text-gray-300">{text}</p>
  </div>
);
