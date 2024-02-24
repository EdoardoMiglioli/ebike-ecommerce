import React from "react";

function NavbarItems(props) {
    const itemClasses = `navbar-link ${props.isProductPage ? "dark" : ""}`;
    return (
        <div>
            <ul className="navbar-items-list">
              <li className="navbar-item"><a className={itemClasses} href="/products">Products</a></li>
              <li className="navbar-item"><a className={itemClasses} href="/about">About</a></li>
              <li className="navbar-item"><a className={itemClasses} href="/contact">Contact</a></li>
            </ul>
        </div>
    );
}

export default NavbarItems;
