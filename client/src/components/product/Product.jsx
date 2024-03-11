import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import StarRating from "./StarRating";

import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

function Product() {
    // Data for testing before a db was created
    const [product, setProduct] = useState({})
    const { productName } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/product/${productName}`);
            setProduct(response.data.product);
          } catch (err) {
            console.log("error fetching product data.");
          }
        };
    
        fetchData();
      
    }, []);

    const stock = product.isinstock ? "In Stock" : "Sold Out";
    const imgPath = `/images/CardImages/${product.imgname}.webp`;

    function calculateRating(star1, stars2, stars3, stars4, stars5) {
        return ((1 * star1) + (1 * stars2) + (1 * stars3) + (1 * stars4) + (1 * stars5)) / 5
    }

    const rating = calculateRating(product.star1, product.stars2, product.stars3, product.stars4, product.stars5);
    

    return (
        <main className="product-page-container">
            <img className="product-page-img" src={imgPath} />
            <div className="product-page-infos-container" >
                <h1 className="product-page-title" >{product.name}</h1>
                <p className="product-page-description" >{product.description}</p>
                <StarRating rating={rating} />
                <div className="product-infos" >
                    <div className="product-info" >
                        <PedalBikeIcon />
                        <p className="product-charge" >Power - {product.charge} Mid Drive</p>
                    </div>
                    <div className="product-info" >
                        <Battery0BarIcon />
                        <p className="product-battery" >Range - Up To {product.battery} miles</p>
                    </div>
                    <div className="product-price-container" >
                        <h3 className="product-price" >${product.price}</h3>
                        <p className="product-stock" >{stock}</p>
                    </div>
                </div>
                <div className="product-buttons-container">
                    <a href="/" className="product-button cart-button">Add to Cart</a>
                    <a href="/" className="product-button buy-button">Buy Now</a>
                </div>
            </div>
        </main>
    );
} 

export default Product;
