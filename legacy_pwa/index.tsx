import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n'; // Import i18n config
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar Service Worker en producción
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      const swUrl = import.meta.env.BASE_URL + 'service-worker.js';
      navigator.serviceWorker.register(swUrl).catch((err) => {
        console.error('SW registration failed', err);
      });
    });
  }
}
