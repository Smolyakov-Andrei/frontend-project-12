import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateLayout from './components/PrivateLayout.jsx'; // Используем новый layout
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<ChatPage />} />
        {/* Здесь в будущем можно будет добавлять другие защищенные страницы */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
