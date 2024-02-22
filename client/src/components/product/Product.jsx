import React, { useState } from "react";
import { useParams } from 'react-router-dom';

import StarRating from "./StarRating";

import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

function Product() {
    // Data for testing before a db was created
    const product = {name: "SwiftEvelo", imgName: "SwiftEvelo_card", shortDescription: "a modern and comfortable eBike for both the wild and the city.", charge: "750w / 115Nm", batteryEnduranceMiles: 100, price: 3000, isInStock: true}

    const [isInStock, setInStock] = useState(product.isInStock);
    const { productName } = useParams();
    const imgPath = `/images/CardImages/${product.imgName}.webp`;


    let stock;
    if (isInStock) {
        stock = "In Stock";
    } else {
        stock = "Sold Out"
    }

    return (
        <main className="product-page-container">
            <img className="product-page-img" src={imgPath} />
            <div className="product-page-infos-container" >
                <h1 className="product-page-title" >{product.name}</h1>
                <p className="product-page-description" >{product.shortDescription}</p>
                <StarRating />
                <div className="product-infos" >
                    <div className="product-info" >
                        <PedalBikeIcon />
                        <p className="product-charge" >Power - {product.charge} Mid Drive</p>
                    </div>
                    <div className="product-info" >
                        <Battery0BarIcon />
                        <p className="product-battery" >Range - Up To {product.battery} miles</p>
                    </div>
                    <p className="product-stock" >{stock}</p>
                </div>
                <div className="product-buttons-container">
                    <button className="product-button cart-button">Add to Cart</button>
                    <button className="product-button buy-button">Buy Now</button>
                </div>
            </div>
        </main>
    );
} 

export default Product;
