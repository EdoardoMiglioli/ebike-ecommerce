import React from "react";

function Paragraph(props) {
    return (
        <div className="paragraph-container">
            <h1 className="paragraph-title">{props.title}</h1>
            <p className="paragraph-text">{props.text}</p>
        </div>
    );
} 

export default Paragraph;
