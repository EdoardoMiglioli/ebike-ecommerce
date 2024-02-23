import React from "react";

function ProductCard(props) {
    const imageURL = `/images/${props.imageName}`;
    const productPath = `/product/${props.name}`

    return (
        <div className="home-product-card">
            <div className="home-product-card-content">
                <img className="home-product-image" src={imageURL} alt={props.name} />
                <div className="product-card-text-container">
                    <h3 className="product-card-title">{props.name}</h3>
                    <p className="product-card-text">{props.description}</p>
                </div>
            </div>
            <a className="product-card-button" href={productPath}>Discover</a>
        </div>
    );
}

export default ProductCard;
