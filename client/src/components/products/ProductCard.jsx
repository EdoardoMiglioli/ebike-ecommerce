import React, { useState } from "react";
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

function ProductCard(props) {
    const [isInStock, setInStock] = useState(props.isInStock);
    const imgPath = `/images/CardImages/${props.imgName}.webp`;
    const productPath = `product/${props.name}`;

    let stock;
    if (isInStock) {
        stock = "In Stock";
    } else {
        stock = "Sold Out"
    }

    return (
        <div className="product-card-container" >
            <img className="product-card-img" src={imgPath} />
            <div className="product-card-infos-container">
                <div className="product-card-header" >
                    <h2 className="product-card-name" >{props.name}</h2>
                    <p className="product-card-description" >{props.shortDescription}</p>
                </div>
                <div className="product-card-infos" >
                    <div className="product-card-info" >
                        <PedalBikeIcon />
                        <p className="product-card-charge" >Power - {props.charge} Mid Drive</p>
                    </div>
                    <div className="product-card-info" >
                        <Battery0BarIcon />
                        <p className="product-card-battery" >Range - Up To {props.battery} miles</p>
                    </div>
                </div>
                <div className="product-card-price-container" >
                    <h3 className="product-card-price" >${props.price}</h3>
                    <p className="product-card-stock" >{stock}</p>
                </div>
                <a className="product-card-cta" href={productPath} >Discover</a>
            </div>
        </div>
    );
}

export default ProductCard;
