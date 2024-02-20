import React, { useState } from "react";

function ProductCard(props) {
    const [isInStock, setInStock] = useState(props.isInStock);

    let stock;
    if (isInStock) {
        stock = "In Stock";
    } else {
        stock = "Sold Out"
    }

    return (
        <div className="product-card-container" >
            <img className="product-card-img" src="" />
            <div className="product-card-infos-container">
                <div className="product-card-header" >
                    <h2 className="product-card-name" >{props.name}</h2>
                    <p className="product-card-container" >{props.shortDescription}</p>
                </div>
                <div className="product-card-infos" >
                    <div className="product-card-info" >
                        <img />
                        <p className="product-card-charge" >Power - {props.charge} Mid Drive</p>
                    </div>
                    <div className="product-card-info" >
                        <img />
                        <p className="product-card-battery" >Range - Up To {props.battery} miles</p>
                    </div>
                </div>
                <div className="product-card-price-container" >
                    <h3 className="product-card-price" >{props.price}</h3>
                    <p className="product-card-stock" >{stock}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
