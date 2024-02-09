import LocalMallIcon from '@mui/icons-material/LocalMall';
import React from "react";

function LoginOrCart(props) {
    return (
        <div>
            {props.isLoggedIn ? <a className="cart" href="/cart"><LocalMallIcon className="cart-icon" /></a> : 
            <div className="login-register-container">
                <a className="login-button-anchor" href="/login"><button className="login-button">Login</button></a>
                <a className="register-button-anchor" href="/register"><button className="register-button">Register</button></a>
            </div>}
        </div>
    );
}

export default LoginOrCart;
