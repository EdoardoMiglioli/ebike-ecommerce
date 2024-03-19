import React from "react";
import PaymentsProductsListCard from "./PaymentsProductListCard";
import PaymentsProductsListHeader from "./PaymentsProductsListHeader";

const PaymentsProductsList = (props) => {
    const products = props.products; 

    return (
        <div className="payments-products-list-container">
            <PaymentsProductsListHeader />
            <div className="payments-products-list">
                {products.map((productName, index) => <PaymentsProductsListCard key={index} productName={productName} />)}
            </div>
        </div>
    );
}

export default PaymentsProductsList;
