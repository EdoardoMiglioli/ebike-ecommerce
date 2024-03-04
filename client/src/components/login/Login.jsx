import axios from "axios";
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

function Login() {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      const parseQueryString = () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get('error');
      };
  
      const error = parseQueryString();
      if (error) {
        setErrorMessage(error);
      }
    }, []);
    
    return (
        <main className="login-container">
            <h1 className="login-title">Login</h1>
            {errorMessage && <p className="error" >{errorMessage}</p>}
            <LoginForm />
        </main>
    );
}

export default Login;
