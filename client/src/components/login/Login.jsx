import axios from "axios";
import ExternalLoginButtons from "../external-login-buttons/ExternalLoginButtons";
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignIn from "./SignIn";

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

    // onClick={google}
    
    return (
      <main className="login-container">
          <h1 className="login-title">Login</h1>
          {errorMessage && <p className="error" >{errorMessage}</p>}
          <LoginForm />
          <ExternalLoginButtons />
      </main>
    );
}

export default Login;
