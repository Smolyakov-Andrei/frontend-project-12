import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import store from './slices/index.js';
import { SocketProvider } from './contexts/SocketContext.jsx'; // <-- ВОТ ОНА, ПРОПУЩЕННАЯ СТРОКА

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
