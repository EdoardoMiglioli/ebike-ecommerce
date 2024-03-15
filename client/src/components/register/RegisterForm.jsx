import React from "react";
import RegisterEmailField from "./registerFields/RegisterEmailField";
import RegisterPasswordField from "./registerFields/RegisterPasswordField";

function RegisterForm() {
  return (
    <form className="register-form" action="/register" method="post">
        <RegisterEmailField />
        <RegisterPasswordField />
        <button className="register-submit" >Register</button>
    </form>
  );
}

export default RegisterForm;
