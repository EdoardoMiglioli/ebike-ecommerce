import axios from "axios";
import React, { useState } from "react";

function Footer() {
    const [isLoggedIn, setLoggedIn] = useState(false)

    try{
        (async () => {
          const response = await axios.get('/api/check-auth');
          const { isAuthenticated } = response.data;
          setLoggedIn(isAuthenticated);
        })();
    } catch (err) {
        console.error('Error checking authentication status:', err);
    }

    return (
    <footer className="footer">
        <div className="logo-container">
            <a className="logo-anchor" href="/"><img id="logo" src="/images/eBike_logo.png" alt="logo" /></a>
        </div>
        <div className="footer-items-container">
            <ul className="footer-items-list">
                <li className="footer-item"><a className="footer-link" href="/products">Products</a></li>
                <li className="footer-item"><a className="footer-link" href="/about">About</a></li>
                <li className="footer-item"><a className="footer-link" href="/contact">Contact</a></li>
            </ul>
        </div>
        <div className="footer-login-register-container">
            <a className="footer-anchor login-anchor" href="/login">Login</a>
            <a className="footer-anchor register-anchor" href="/register">Register</a>
            {isLoggedIn && <form className="footer-anchor register-anchor" action="http://localhost:5001/auth/logout" method="post"><button type="submit">Logout</button></form>}
        </div>
    </footer>);
}

export default Footer;
