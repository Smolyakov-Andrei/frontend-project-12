import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const PrivateLayout = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateLayout;
