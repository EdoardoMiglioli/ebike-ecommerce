import React from "react";

function NavbarItems() {
    return (
        <ul className="navbar-items-list">
          <li className="navbar-item"><a className="navbar-link" href="/products">Products</a></li>
          <li className="navbar-item"><a className="navbar-link" href="/about">About</a></li>
          <li className="navbar-item"><a className="navbar-link" href="/contact">Contact</a></li>
        </ul>
    );
}

export default NavbarItems;
