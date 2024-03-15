import LocalMallIcon from '@mui/icons-material/LocalMall';
import React from "react";

function NavbarItems(props) {
    const itemClasses = `navbar-link ${props.isProductPage ? "dark" : ""}`;
    const chartStyle = props.isProductPage ? "black" : "white";
    return (
        <div>
            <ul className="navbar-items-list">
              <li className="navbar-item"><a className={itemClasses} href="/products">Products</a></li>
              <li className="navbar-item"><a className={itemClasses} href="/about">About</a></li>
              <li className="navbar-item"><a className={itemClasses} href="/contact">Contact</a></li>
              {props.isSmallScreen && props.isLoggedIn ? (
                    props.isSmallScreen && <a className="cart" href="/cart"><LocalMallIcon className="cart-icon" style={{ color: chartStyle }}/></a>
                ) : (
                    props.isSmallScreen && <div className="navbar-login-register-container">
                    <li className="navbar-item"><a className={itemClasses} href="/login">Login</a></li> 
                    <li className="navbar-item"><a className={itemClasses} href="/register">Register</a></li>
                  </div>
                )}
            </ul>
        </div>
    );
}

export default NavbarItems;
