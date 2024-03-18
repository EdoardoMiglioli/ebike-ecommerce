import React from "react";

import PaymentsForm from "./paymentsForm/PaymentsForm";
import PaymentsProductsList from "./paymentsProductsList/PaymentsProductsList";

function Payments() {
    return (
        <main className="payments-background">
            <div className="payments-container">
                <PaymentsForm />   
                <PaymentsProductsList />  
            </div>
        </main>
    );
}

export default Payments;
