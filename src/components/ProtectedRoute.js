import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const token = localStorage.getItem('token'); // Get token from localStorage
  
  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  // Return the requested element if token exists
  return element;
}

export default ProtectedRoute;
