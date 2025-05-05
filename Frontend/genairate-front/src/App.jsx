import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/EditorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HistoryPage from './pages/HistoryPage';
import TemplatesPage from './pages/TemplatesPage';
import SettingsPage from './pages/SettingsPage';
import AccountPage from './pages/AccountPage';
import ErrorPage from './components/ErrorPage';
import Layout from './Layout';

import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

import { FontSizeProvider, useFontSize } from './components/FontSizeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'editor',
        element: <EditorPage />
      },
      {
        path: 'editor/:id',
        element: <EditorPage />
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />
      },
      {
        path: 'history',
        element: <HistoryPage />
      },
      {
        path: 'templates',
        element: <TemplatesPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'account',
        element: <AccountPage />
      }
    ]
  }
]);

import ErrorBoundary from './components/ErrorBoundary';

function AppWrapper({ children }) {
  const { getFontSizeClass } = useFontSize();

  return (
    <div className={`${getFontSizeClass()} text-gray-900 dark:text-gray-100 min-h-screen`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <EditorProvider>
          <FontSizeProvider>
            <ErrorBoundary>
              <AppWrapper>
                <RouterProvider router={router} />
              </AppWrapper>
            </ErrorBoundary>
          </FontSizeProvider>
        </EditorProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
