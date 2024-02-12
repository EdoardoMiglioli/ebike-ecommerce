import React from "react";

function ProductCard(props) {
    const imageURL = `/images/${props.imageName}`;
    const productPath = `/products/${props.name}`

    return (
        <div className="home-product-card">
            <img src={imageURL} alt={props.name} />
            <div className="product-card-text-container">
                <h3 className="product-card-title">{props.name}</h3>
                <p className="product-card-text">{props.description}</p>
            </div>
            <a className="product-card-button" type="button" href={productPath}>Discover</a>
        </div>
    );
}

export default ProductCard;
