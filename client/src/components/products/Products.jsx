import React from "react";
import ProductsHero from "./ProductsHero";
import ProductCard from "./ProductCard";

function Products() {
    const productsList = [
        {name: "SwiftEvelo", shortDescription: "a modern and comfortable eBike for both the wild and the city.", charge: "750w / 115Nm", batteryEnduranceMiles: 100, price: 3000, isInStock: true},
        {name: "3cycle", shortDescription: "All the comfort you need in the city.", charge: "900w / 90Nm", batteryEnduranceMiles: 60, price: 2500, isInStock: true},
        {name: "VelocitySpark", shortDescription: "Perfect for a relaxing and yet challenging pedalling.", charge: "700w / 115Nm", batteryEnduranceMiles: 80, price: 2000, isInStock: true},
        {name: "GlidePulse", shortDescription: "An high tech eBike for passionates who fear nothing.", charge: "600w / 100Nm", batteryEnduranceMiles: 120, price: 2750, isInStock: true},
    ];
    
    return (
        <main>
            <ProductsHero />
            <div className="products-container" >
                {productsList.map((product, index) => {
                    return <ProductCard key={index} name={product.name} shortDescription={product.shortDescription} charge={product.charge} battery={product.batteryEnduranceMiles} price={product.price} isInStock={product.isInStock} />
                })}
            </div>
        </main>
    );
}

export default Products;
