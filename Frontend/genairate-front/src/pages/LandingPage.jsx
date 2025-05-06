import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage({ darkMode, toggleDarkMode }) {
  const [themeIcon, setThemeIcon] = useState("moon");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeIcon(isDark ? "sun" : "moon");
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
    setThemeIcon((prev) => (prev === "moon" ? "sun" : "moon"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold font-serif">
          <Link to="/">GenAIrate</Link>
        </h1>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="border border-black dark:border-white text-black dark:text-white font-semibold px-4 py-2 rounded-xl transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-primary text-black dark:text-white border border-black dark:border-white font-semibold px-4 py-2 rounded-xl shadow-md transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Registrarse
          </Link>
          <button
            onClick={handleToggle}
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
            aria-label="Toggle Dark Mode"
          >
            {themeIcon === "moon" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14a7 7 0 000-14z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-12 gap-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold max-w-2xl">
          Desatá tu creatividad con <span className="text-primary">inteligencia artificial</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          Empezá a escribir artículos de calidad desde tu dispositivo. <br className="hidden sm:block" />
          Sin cuentas. Sin conexión. Sin complicaciones.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-5 mt-6 max-w-md shadow-sm">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="mr-1">⚡</span>
            <span className="font-medium">Productividad sin barreras.</span> GenAIrate funciona 100% offline y en tu dispositivo.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-sm text-center text-gray-500 dark:text-gray-400 relative">
        <div className="h-px w-[80%] mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700 mb-4" />
        © {new Date().getFullYear()} GenAIrate. Todos los derechos reservados.
      </footer>
    </div>
  );
}
