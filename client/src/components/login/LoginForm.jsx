import React from "react";
import LoginEmailField from "./loginFields/LoginEmailField";
import LoginPasswordField from "./loginFields/LoginPasswordField";

function LoginForm() {
    return (
        <form className="login-form" action="login" method="post">
            <LoginEmailField />
            <LoginPasswordField />
            <button className="login-submit" >Login</button>
        </form>
    );
}

export default LoginForm;
