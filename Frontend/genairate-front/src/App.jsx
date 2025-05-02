import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/EditorPage';
import ErrorPage from './components/ErrorPage';
import Layout from './Layout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EditorProvider>
          <div className="min-h-screen bg-background">
            <RouterProvider router={router} />
          </div>
        </EditorProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;