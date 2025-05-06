import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/EditorPage';
import ErrorPage from './components/ErrorPage';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function RoutesWithAuth({ darkMode, toggleDarkMode }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;

  const router = createBrowserRouter(
    isAuthenticated()
      ? [
          {
            path: '/',
            element: <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />,
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <HomePage /> },
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'editor', element: <EditorPage /> },
              { path: 'editor/:id', element: <EditorPage /> }
            ]
          }
        ]
      : [
          {
            path: '/',
            element: <LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />,
            errorElement: <ErrorPage />
          },
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
          { path: '*', element: <LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> }
        ]
  );

  return <RouterProvider router={router} />;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
    else if (saved === 'false') setDarkMode(false);
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <AuthProvider>
      <EditorProvider>
        <ErrorBoundary>
          <RoutesWithAuth darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </ErrorBoundary>
      </EditorProvider>
    </AuthProvider>
  );
}

export default App;
