import React from "react";

function ProductCard(props) {
    const imageURL = `/images/${props.imageName}`;
    const productPath = `/products/${props.name}`

    return (
        <div className="home-product-card">
            <div className="home-product-card-content">
                <img className="home-product-image" src={imageURL} alt={props.name} />
                <div className="product-card-text-container">
                    <h3 className="product-card-title">{props.name}</h3>
                    <p className="product-card-text">{props.description}</p>
                </div>
            </div>
            <button className="product-card-button" type="button"><a className="product-card-button-anchor" href={productPath}>Discover</a></button>
        </div>
    );
}

export default ProductCard;
