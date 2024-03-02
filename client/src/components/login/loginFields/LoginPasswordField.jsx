import React from "react";

function LoginPasswordField() {
    return (                
    <div className="login-field-container">
        <label className="login-password-label" >Password</label>
        <input className="login-password-input" type="password" name="password" />
    </div>
);
}

export default LoginPasswordField;
