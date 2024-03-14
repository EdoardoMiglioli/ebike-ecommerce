import ExternalLoginButtons from "../external-login-buttons/ExternalLoginButtons";
import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {

    const google = () => {
        window.open("http://localhost:5001/auth/google", "_self")
    }

    const github = () => {
      window.open("http://localhost:5001/auth/github", "_self")
    }
      
    return (
        <main className="register-container">
            <h1 className="register-title">Register</h1>
            <RegisterForm />
            <ExternalLoginButtons onClickGoogle={google} onClickGitHub={github} />
        </main>
    );
}

export default Register;
