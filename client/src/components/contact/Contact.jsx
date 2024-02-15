import React from "react";

function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-form-container">
                <form className="contact-form">
                    <label className="contact-form-label">Name</label>
                    <input className="contact-form-input" type="text" placeholder="Type your full name" />

                    <label className="contact-form-label" >Email</label>
                    <input className="contact-form-input" type="text" placeholder="Type your full name" />

                    <label className="contact-form-label" >Phone number</label>
                    <input className="contact-form-input" type="text" placeholder="Type your full name" />

                    <label className="contact-form-label" >Message</label>
                    <textarea className="contact-form-input" ></textarea>

                    <button className="contact-form-btn" type="submit">Submit</button>
                </form>
            </div>
            <div className="contact-info-container">
                <h1 className="contact-info-title">Contact Us</h1>
                <p className="contact-info-text">
                    For inquiries, feedback, or partnerships, reach out to us via email, phone, or the contact form below. Our team is here to assist you promptly. Thank you for considering ElectroVolt.
                </p>
                <ul className="contact-info-list">
                    <li className="contact-info-list-item">
                        <img className="contact-info-icon"></img>
                        <p className="contact-info-text"></p>
                    </li>
                    <li className="contact-info-list-item">
                        <img className="contact-info-icon"></img>
                        <p className="contact-info-text"></p>
                    </li>
                    <li className="contact-info-list-item">
                        <img className="contact-info-icon"></img>
                        <p className="contact-info-text"></p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Contact;
