import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import store from './slices/index.js';
import { SocketProvider } from './contexts/SocketContext.jsx';
import i18n from './init.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
