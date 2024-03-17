import axios from "axios";
import React, {useState, useEffect} from "react";

import CartCard from "./CartCard";
import CartBuyButton from "./CartBuyButton";

function Cart() {
    const [cartProduct, setCartProduct] = useState([]);
    const product = {
        name: "eBike name",
        imgname: "3cycle_card",
        isinstock: true,
        description: "descpription descpription descpription descpription descpription descpription",
        price: 2500
    }

    return (
        <main className="cart-container">
            <div className="cart-cards-container">
                <CartCard product={product} />
            </div>
            <CartBuyButton />
        </main>
    );
}

export default Cart;
