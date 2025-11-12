import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store';

// Check for existing token on app load
const token = localStorage.getItem('token');
if (token) {
  // You might want to validate the token here
  // and fetch user data if needed
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
