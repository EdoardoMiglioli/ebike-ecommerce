import React from "react";
import ContactForm from "./contact_form/ContactForm"
import ContactInfo from "./contact_info/ContactInfo";


function Contact() {
    return (
        <div className="contact-container">
            <ContactForm />
            <ContactInfo />
        </div>
    );
}

export default Contact;
