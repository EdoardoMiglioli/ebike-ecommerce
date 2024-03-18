import React from "react";
import PaymentsProductsListCard from "./PaymentsProductListCard";
import PaymentsProductsListHeader from "./PaymentsProductsListHeader";

const PaymentsProductsList = () => {
    return (
        <div className="payments-products-list-container">
            <PaymentsProductsListHeader />
            <div className="payments-products-list">
                <PaymentsProductsListCard />
            </div>
        </div>
    );
}

export default PaymentsProductsList;
