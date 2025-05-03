import { useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null); // null = no logueado

  const handleLogout = () => setUser(null);

  return (
    <nav className="w-full bg-background/80 backdrop-blur border-b border-gray-700 px-4 py-2 flex justify-between items-center text-sm shadow-sm">
      <span className="font-semibold text-primary tracking-tight">GenAIrate</span>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-white/70">👤 {user.name}</span>
            <button
              className="border border-primary text-primary hover:bg-cyan-900 px-3 py-1 rounded-lg transition"
              onClick={handleLogout}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              className="text-white/70 hover:text-white/90 transition"
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="border border-accent text-accent hover:bg-purple-900 px-3 py-1 rounded-lg transition"
            >
              Registrarme
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
