import React from "react";

function ContactInfoHeader(props) {
    return (
        <div className="contact-info-header-container">
            <h1 className="contact-info-title">{props.title}</h1>
            <p className="contact-info-text">{props.text}</p>
        </div>
    );
}

export default ContactInfoHeader;
