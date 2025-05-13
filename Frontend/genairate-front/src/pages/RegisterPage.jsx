import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register as registerService } from '../services/authService';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await registerService(name, email, password);
      login(user, token);
      navigate('/onboarding'); 
    } catch (err) {
      alert('Error al registrarse. Revisa los datos o intenta más tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-8 rounded-xl border border-gray-300 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
            } font-semibold border border-black dark:border-white transition`}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="underline hover:text-primary">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
