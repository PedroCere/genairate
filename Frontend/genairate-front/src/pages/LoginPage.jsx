import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mockUsers = [
    { email: 'demo@genairate.com', password: '123456', name: 'Demo User' },
    { email: 'santi@genairate.com', password: 'qwerty', name: 'Santino' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert('Credenciales inválidas. Probá con: demo@genairate.com / 123456');
      return;
    }

    login({ name: foundUser.name, email: foundUser.email }, 'demo-token');
    navigate('/')
  };

  return (
    <div className="flex items-start justify-center min-h-screen pt-8 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-8 rounded-xl border border-gray-300 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-2 rounded-md bg-primary text-black dark:text-white font-semibold border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="underline hover:text-primary">
            Registrate acá
          </Link>
        </p>
      </div>
    </div>
  );
}
