import React from "react";

const PaymentsCardNumberField = () => {
    return (
        <div className="payments-form-field payments-card-number-field">
            <label className="payments-form-label card-number-label">Card number</label>
            <input className="payments-form-input card-number-input" type="text" />
        </div>
    );
}

export default PaymentsCardNumberField;