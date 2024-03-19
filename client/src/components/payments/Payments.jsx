import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import PaymentsForm from "./paymentsForm/PaymentsForm";
import PaymentsProductsList from "./paymentsProductsList/PaymentsProductsList";

function Payments() {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const { productName } = queryParams;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/cart-products`);
                setProducts(response.data.products);
            } catch (err) {
                console.log("Error getting your cart's products.");
            }
        };

        if (productName) {
            setProducts([productName]);
        } else {
            fetchData();
        }
    }, [productName]);

    return (
        <main className="payments-background">
            <div className="payments-container">
                <PaymentsForm />   
                <PaymentsProductsList products={products} />  
            </div>
        </main>
    );
}

export default Payments;
