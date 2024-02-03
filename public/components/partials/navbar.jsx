import React from "react";

function Navbar(props) {

    <div>
        <img id="logo" src="" alt="logo" />
        <ul class="navbar-items">
            <li class="navbar-item"><a class="navbar-link" href="/products">Products</a></li>
            <li class="navbar-item"><a class="navbar-link" href="/about">About</a></li>
            <li class="navbar-item"><a class="navbar-link" href="/contact">Contact</a></li>
        </ul>
        {props.isAuthenticated ? <div/> : <img src="" alt="cart" />}
    </div>
}