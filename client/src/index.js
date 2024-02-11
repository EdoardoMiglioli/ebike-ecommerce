import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/home.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import App from './components/App'
import reportWebVitals from './reportWebVitals';

const navbarRoot = document.getElementById('navbar');
const appRoot = document.getElementById('app');
const footerRoot = document.getElementById('footer');

createRoot(navbarRoot).render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
);

createRoot(footerRoot).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);

createRoot(appRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
