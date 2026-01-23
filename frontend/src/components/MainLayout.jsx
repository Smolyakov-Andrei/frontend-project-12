import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatNavbar from './ChatNavbar.jsx';

const MainLayout = () => (
  <div className="d-flex flex-column h-100">
    <ChatNavbar />
    <Outlet />
  </div>
);

export default MainLayout;
