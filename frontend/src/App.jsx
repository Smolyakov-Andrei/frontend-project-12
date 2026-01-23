import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout.jsx';
import PrivateLayout from './components/PrivateLayout.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Modal from './modals/index.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<ChatPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Modal />
    </>
  );
}

export default App;
