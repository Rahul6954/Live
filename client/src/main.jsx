import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './store/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <div id="wrapper">
        <App />
      </div>
    </React.StrictMode>
  </AuthProvider>,
);
