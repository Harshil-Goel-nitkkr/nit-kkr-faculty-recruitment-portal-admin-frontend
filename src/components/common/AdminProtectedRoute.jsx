// src/components/common/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  const token = localStorage.getItem('nitkkr_admin_token');

  if (!token || !admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
