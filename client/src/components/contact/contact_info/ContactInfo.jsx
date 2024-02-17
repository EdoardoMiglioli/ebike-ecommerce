import React from "react";
import ContactInfoHeader from "./ContactInfoHeader";
import ContactInfoListItem from "./ContactInfoListItem";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function ContactInfo() {
    const contactInfos = [{id: 1, image: LocalPhoneIcon, text: "+123-456-7890"}, {id: 2, image: EmailIcon, text: "electrovolt.service@gmail.com"}, {id: 3, image: LocationOnIcon, text: "1234 Green Street, EcoCity, EV 56789, Sustainableville, USA"}]
    return (
        <div className="contact-info-container">
            <ContactInfoHeader title="Contact Us" text="For inquiries, feedback, or partnerships, reach out to us via email, phone, or the contact form below. Our team is here to assist you promptly. Thank you for considering ElectroVolt."/>
            <ul className="contact-info-list">
                {contactInfos.map((info) => {
                    return <ContactInfoListItem key={info.id} image={info.image} text={info.text} />
                })}
            </ul>   
        </div>
    );
}

export default ContactInfo;
