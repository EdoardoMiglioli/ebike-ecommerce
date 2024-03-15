import ExternalLoginButtons from "../external-login-buttons/ExternalLoginButtons";
import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";

function Register() {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      const getErrorFromURL = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setErrorMessage(errorParam);
        }
      };
  
      getErrorFromURL();
    }, []);

    const google = () => {
        window.open("http://localhost:5001/auth/google", "_self")
    }

    const github = () => {
      window.open("http://localhost:5001/auth/github", "_self")
    }
      
    return (
        <main className="register-container">
            <h1 className="register-title">Register</h1>
            {errorMessage && <p className="error" >{errorMessage}</p>}
            <RegisterForm />
            <ExternalLoginButtons onClickGoogle={google} onClickGitHub={github} />
        </main>
    );
}

export default Register;
