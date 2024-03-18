import React from "react";

const PaymentsCardExpirationField = () => {
    return (
        <div className="payments-form-field payments-card-expiration-field">
            <label className="payments-form-label card-expiration-label">Expiration date</label>
            <input className="payments-form-input card-expiration-input" type="text" />
        </div>
    );
}

export default PaymentsCardExpirationField;
