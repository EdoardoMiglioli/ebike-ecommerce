import React from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Cart from './cart/Cart';
import Contact from './contact/Contact'
import Payments from './payments/Payments';
import Product from './product/Product';
import Products from './products/Products';
import Register from './register/Register';
import Login from './login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/google/secrets" element={<Home />} />
        <Route path="/auth/github/callback" element={<Home />} />

        <Route excat path="/about" element={<About />} />
        <Route excat path="/contact" element={<Contact />} />
        <Route excat path="/products" element={<Products />} />
        <Route excat path="/product/:productName" element={<Product />} />

        <Route excat path="/register" element={<Register />} />
        <Route excat path="/login" element={<Login />} />

        <Route excat path="/cart" element={<Cart />} />
        <Route excat path="/payments" element={<Payments />} />
        <Route path="*" element={<h1>Not found 404 (*O*)</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
