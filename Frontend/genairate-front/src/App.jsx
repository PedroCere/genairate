import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/EditorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HistoryPage from './pages/HistoryPage';
import TemplatesPage from './pages/TemplatesPage';
import SettingsLayout from './components/settings/SettingsLayout';
import AccountPage from './pages/AccountPage';
import PreferencesSection from './components/preferences/PreferencesSection';
import ErrorPage from './components/ErrorPage';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

import { FontSizeProvider, useFontSize } from './components/FontSizeContext';

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
              { path: 'editor/:id', element: <EditorPage /> },
              { path: 'analytics', element: <AnalyticsPage /> },
              { path: 'history', element: <HistoryPage /> },
              { path: 'templates', element: <TemplatesPage /> },
              {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                  { index: true, element: <PreferencesSection /> },
                  { path: 'account', element: <AccountPage /> },
                  { path: 'preferences', element: <PreferencesSection /> },
                  { path: 'notifications', element: <div className="p-6 text-gray-600 dark:text-gray-400">Próximamente</div> },
                  { path: 'security', element: <div className="p-6 text-gray-600 dark:text-gray-400">Próximamente</div> }
                ]
              }
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

function AppWrapper({ children }) {
  const { getFontSizeClass } = useFontSize();

  return (
    <div className={`${getFontSizeClass()} text-gray-900 dark:text-gray-100 min-h-screen`}>
      {children}
    </div>
  );
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
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <EditorProvider>
          <FontSizeProvider>
            <ErrorBoundary>
              <AppWrapper>
                <RoutesWithAuth darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </AppWrapper>
            </ErrorBoundary>
          </FontSizeProvider>
        </EditorProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;

