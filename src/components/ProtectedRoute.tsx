import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../store/app.store';


const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
