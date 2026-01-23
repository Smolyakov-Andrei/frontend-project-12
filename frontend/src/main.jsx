import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import store from './slices/index.js';
import { SocketProvider } from './contexts/SocketContext.jsx';
import i18n from './init.js';

const rollbarConfig = {
  accessToken: 'f847fb27a50b466ea3a6b2f5c17ef1c9',
  environment: 'production',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
