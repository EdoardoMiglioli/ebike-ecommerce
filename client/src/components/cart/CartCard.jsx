import axios from "axios";
import React, {useState, useEffect} from "react";

function Cartcard(props) {
    const productName = props.productName;
    const [product, setProduct] = useState({});

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

    if (!product || !product.name) {
        return <div>Loading...</div>;
    }

    const imgPath = `/images/CardImages/${product.imgname}.webp`;

    let stock;
    if (product.isinstock) {
        stock = "In Stock";
    } else {
        stock = "Sold Out"
    }

    return (
        <div className="cart-card-container">
            <img className="cart-card-img" src={imgPath} alt="ebike image" />
            <div className="cart-card-content-container" >
                <div  className="cart-card-infos-container" >
                    <h3 className="cart-card-title" >{product.name}</h3>
                    <p className="cart-card-stock" >{stock}</p>
                    <p className="cart-card-description" >{product.description}</p>
                </div>
                <h4 className="cart-card-price" >${product.price}</h4>
            </div>
        </div>
    );
}

export default Cartcard;
