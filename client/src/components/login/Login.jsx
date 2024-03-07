import axios from "axios";
import GoogleIcon from '@mui/icons-material/Google';
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
          <div className="external-login-button google" >
            <GoogleIcon alt="Google logo" className="login-icon" />
            Google
          </div>
      </main>
    );
}

export default Login;
