import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

function ProtectedRoute({ children }) {
  const { token, user } = useAuthStore();
  
  // Check if user is authenticated (has token in store or localStorage)
  const authToken = token || localStorage.getItem('authToken');
  
  if (!authToken) {
    // If not authenticated, redirect to enterprise login
    return <Navigate to="/home/enterprise" replace />;
  }
  
  return children;
}

export default ProtectedRoute;
