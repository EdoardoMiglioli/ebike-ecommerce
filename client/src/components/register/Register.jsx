import ExternalLoginButtons from "../external-login-buttons/ExternalLoginButtons";
import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {
    return (
        <main className="register-container">
            <h1 className="register-title">Register</h1>
            <RegisterForm />
            <ExternalLoginButtons />
        </main>
    );
}

export default Register;
