import React from "react";

const PaymentsNameField = () => {
    return (
        <div className="payments-form-field payments-name-field">
            <label className="payments-form-label card-name-label">Card owner's name</label>
            <input className="payments-form-input card-name-input" type="text" />
        </div>
    );
}

export default PaymentsNameField;