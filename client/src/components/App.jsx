import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Contact from './contact/Contact'
import Product from './product/Product';
import Products from './products/Products';
import Register from './register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route excat path="/about" element={<About />} />
        <Route excat path="/contact" element={<Contact />} />
        <Route excat path="/products" element={<Products />} />
        <Route path="/product/:productName" element={<Product />} />
        <Route excat path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not found 404 (*O*)</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
