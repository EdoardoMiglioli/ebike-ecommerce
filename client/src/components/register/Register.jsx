import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {
    return (
        <main className="register-container">
            <h1 className="register-title">Register</h1>
            <RegisterForm />
            <a class="btn btn-block" href="/auth/google" role="button">
              <i class="fab fa-google"></i>
              Sign Up with Google
            </a>
        </main>
    );
}

export default Register;
