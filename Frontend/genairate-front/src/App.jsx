import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/EditorPage';
import ErrorPage from './components/ErrorPage';
import Layout from './Layout';

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
      }
    ]
  }
]);

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <EditorProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </EditorProvider>
    </AuthProvider>
  );
}

export default App;
