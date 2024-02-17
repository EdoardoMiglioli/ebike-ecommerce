import React from "react";
import ContactFormField from "./ContactFormField";

function ContactForm() {
    return (
        <div className="contact-form-container">
            <form className="contact-form">
                <ContactFormField name="Name" />
                <ContactFormField name="Email" />
                <ContactFormField name="Phone" />

                <div className="contact-form-message-container">
                    <label className="contact-form-label" >Message</label>
                    <textarea className="contact-form-input contact-form-field-message"></textarea>
                </div>

                <button className="contact-form-btn" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;
