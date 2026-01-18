import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import ChatNavbar from './ChatNavbar.jsx';

const PrivateLayout = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="d-flex flex-column h-100">
      <ChatNavbar />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
