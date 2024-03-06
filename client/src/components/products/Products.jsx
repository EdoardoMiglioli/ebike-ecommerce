import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductsHero from "./ProductsHero";
import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";

function Products() {
    const [productsList, setProductsList] = useState([])
    const [sortBy, setSortBy] = useState('id');
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/products?sorting=${sortBy}`);
          setProductsList(response.data.products);
        } catch (err) {
          setError(err);
        }
      };
  
      fetchData();
    
    }, [sortBy]);

    if (error) {
      console.log(error);
      return (
        <main>
          <ProductsHero />
          <div className="products-container">
            <p>No products found</p>
          </div>
        </main>
    );
    }
    
    
    return (
        <main>
            <ProductsHero />
            <SortProducts sortBy={sortBy} onSortChange={setSortBy} />
            <div className="products-container" >
                {productsList.map((product) => {
                    return <ProductCard key={product.id} name={product.name} imgName={product.imgname} shortDescription={product.description} charge={product.charge} battery={product.batteryendurancemiles} price={parseInt(product.price)} isInStock={product.isinstock} />
                })}
            </div>
        </main>
    );
}

export default Products;
