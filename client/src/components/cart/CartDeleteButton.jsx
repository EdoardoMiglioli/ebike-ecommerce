import axios from "axios";
import React, { useState, useEffect } from "react";

function CartDeleteButton(props) {

    return (
        <div className="cart-delete-button-container">
            <form className="delete-from-cart-form" action={`/delete-from-cart/${props.productName}`} method="delete">
                <button type="submit" className="cart-delete-button">Delete</button>
            </form> 
        </div>
    );
}

export default CartDeleteButton;
