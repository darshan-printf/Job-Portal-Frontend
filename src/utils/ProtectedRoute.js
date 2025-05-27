// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const role = localStorage.getItem('role'); // 'admin' or 'user'

  if (!role) {
    return <Navigate to="/" replace />; // Not logged in
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Role not allowed
  }

  return Component;
};

export default ProtectedRoute;
