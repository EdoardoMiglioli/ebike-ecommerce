import React from "react";

import PaymentsNameField from "./PaymentsNameField";
import PaymentsCardNumberField from "./PaymentsCardNumberField";
import PaymentsCardExpirationField from "./PaymentsCardExpirationField";
import PaymentsCVVField from "./PaymentsCVVField";

function PaymentsForm() {
    return (
        <div className="payments-form-container">
            <form className="payments-form">
                <PaymentsNameField />
                <PaymentsCardNumberField />
                <div className="payments-fields-group">
                    <PaymentsCardExpirationField />
                    <PaymentsCVVField />
                </div>

                <button className="payments-form-btn" type="submit">Order</button>
            </form>
        </div>
    );
}

export default PaymentsForm;
