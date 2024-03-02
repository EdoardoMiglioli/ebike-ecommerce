import React from "react";

function RegisterPasswordField() {
    return (                
    <div className="register-field-container">
        <label className="register-password-label" >Password</label>
        <input className="register-password-input" type="password" name="password" />
    </div>
);
}

export default RegisterPasswordField;
