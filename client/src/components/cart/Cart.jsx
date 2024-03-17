import axios from "axios";
import React, {useState, useEffect} from "react";

import CartCard from "./CartCard";
import CartBuyButton from "./CartBuyButton";

function Cart() {
    const [cartProduct, setCartProduct] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/cart-products`);
                setCartProduct(response.data.products);
            } catch (err) {
                setError("Error getting your products.")
            }
        }

        fetchData();

    }, []);

    return (
        <main className="cart-container">
            {error ? (
                <p className="error" >{error}</p>
            ) : (
                <div className="cart-cards-container">
                    {cartProduct.map((productName, index) => {
                        return <CartCard key={index} productName={productName} />
                    })}
                </div>
            )}
            <CartBuyButton />
        </main>
    );
}

export default Cart;
