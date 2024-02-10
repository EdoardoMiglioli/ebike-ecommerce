import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/navbar.css';
import './styles/footer.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import reportWebVitals from './reportWebVitals';


const navbar = createRoot(document.getElementById('navbar'));
navbar.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
);

const footer = createRoot(document.getElementById('footer'));
footer.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
