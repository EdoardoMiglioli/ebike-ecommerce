import React from "react";

function ContactFormField(props) {
    const customClassName = `contact-form-field-${props.name.toLowerCase()}`;
    const containerClasses = `contact-form-field-container ${customClassName}`;
    console.log(customClassName)

    return (
        <div className={containerClasses}>
            <label className="contact-form-label">{props.name}</label>
            <input className="contact-form-input" type="text" />
        </div>
    );
}

export default ContactFormField;
