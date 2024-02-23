import React from "react";

function HomeHero() {
    return (
    <section className="hero-container">         
        <div className="hero-content">
            <h1 className="hero-title">The trip<br/><b>Starts now.</b></h1>
            <div className="hero-buttons">
                <a href="/products" className="ebikes-button">eBikes</a>
                <a href="/contact" className="contact-button">Contact</a>
            </div>
        </div>
    </section>
);
}

export default HomeHero;
