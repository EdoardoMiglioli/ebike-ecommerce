import axios from "axios";
import React from "react";

function CartDeleteButton(props) {

    const deleteProduct = async () => {
        try {
            const response = await axios.delete(`/delete-from-cart/${props.productName}`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    return (
        <form className="cart-delete-button-container" onSubmit={deleteProduct}>
            <button type="submit" className="cart-delete-button">Delete</button>
        </form> 
    );
}

export default CartDeleteButton;
