import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../ui/Spinner';

const ProtectedRoute = ({children}) => {
  const isAuthenticated = false; // Replace with actual authentication logic
  const loading = false; // Replace with actual loading state
  const location = useLocation(); 

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute