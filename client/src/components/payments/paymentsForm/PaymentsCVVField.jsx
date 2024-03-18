import React from "react";

const PaymentsCVVField = () => {
    return (
        <div className="payments-form-field payments-cvv-field">
            <label className="payments-form-label cvv-label">CVV</label>
            <input className="payments-form-input cvv-input" type="text" />
        </div>
    );
}

export default PaymentsCVVField;