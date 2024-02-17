import React from "react";

function ContactInfoListItem(props) {
    
    return (
        <li className="contact-info-list-item">
            <div className="contact-info-icon"><props.image /></div>
            <p className="contact-info-text">{props.text}</p>
        </li>
    );
}

export default ContactInfoListItem;
