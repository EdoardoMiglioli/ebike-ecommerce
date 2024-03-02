import React from "react";

function LoginEmailField() {
    return (                
    <div className="login-field-container">
        <label className="login-email-label" >Email</label>
        <input className="login-email-input" type="email" name="email" />
    </div>
);
}

export default LoginEmailField;
