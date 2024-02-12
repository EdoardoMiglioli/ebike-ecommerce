import React from "react";

function HotProductSection() {
    return (
        <section className="hot-product-section">
            <div className="hot-product-section-container">
                <div className="hot-product-content-container">
                    <h1 className="hot-product-section-title">The new SwiftEvelo</h1>
                    <p className="hot-product-section-text">
                    Discover our latest creation,
                    the SwiftEvelo, a modern and comfortable
                    eBike characterized by an elegant desig
                    built for both the wild and the city.
                    </p>
                    <button className="hot-product-section-button">Shop</button>
                </div>
                <img className="hot-product-image" src="/images/SwiftEvelo.png" alt="SwiftEvelo" />
            </div>
        </section>
    );
}

export default HotProductSection;
