import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

import LoginPage from './pages/LoginPage';
import ResourceListPage from './pages/ResourceListPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import FilmDetailPage from './pages/FilmDetailPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import StarshipDetailPage from './pages/StarshipDetailPage';
import HomePage from './pages/HomePage';


// Define routes
export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'resources',
        element: <ProtectedRoute element={<ResourceListPage />} />
      },
      {
        path: 'resources/:id',
        element: <ProtectedRoute element={<ResourceDetailPage />} />
      },
      {
        path: 'films/:id',
        element: <ProtectedRoute element={<FilmDetailPage />} />
      },
      {
        path: 'vehicles/:id',
        element: <ProtectedRoute element={<VehicleDetailPage />} />
      },
      {
        path: 'starships/:id',
        element: <ProtectedRoute element={<StarshipDetailPage />} />
      }
    ]
  }
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15
    }
  }
});

// Render the app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
