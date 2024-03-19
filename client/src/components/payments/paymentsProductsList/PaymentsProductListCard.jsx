import axios from "axios";
import React, { useState, useEffect } from "react";

const PaymentsProductsListCard = (props) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/product/${props.productName}`);
            setProduct(response.data.product);
          } catch (err) {
            console.log("error fetching product data.");
          }
        };
    
        fetchData();
      
    }, []);


    if (!product) {
        return <div>Loading...</div>
    }

    const imgPath = `/images/CardImages/${product.imgname}.webp`;

    return (
        <div className="payments-products-card">
            <img src={imgPath} className="payments-products-card-img" />
            <h4 className="payments-products-card-title">{product.name}</h4>
            <h5 className="payments-products-card-price">{product.price}</h5>
        </div>
    );
}

export default PaymentsProductsListCard;
