import React from "react";
import HomeHero from "./HomeHero";
import HotProductSection from "./HotProductSection";
import ProductCard from "./ProductCard";

function Home() {
    const productsList = [
        {name: "3cycle", description: "All the comfort you need in the city.", imageName: "3cycle.jpg"},
        {name: "VelocitySpark", description: "Perfect for a relaxing and yet challenging pedalling.", imageName: "VelocitySpark.jpg"},
        {name: "GlidePulse", description: "An high tech eBike for passionates who fear nothing.", imageName: "GlidePulse.jpg"},
    ];

    return (
        <main>
            <HomeHero />
            <HotProductSection />
            <section className="products-list-section">
                {productsList.map((product, index) => {
                    return <ProductCard key={index} name={product.name} description={product.description} imageName={product.imageName} />;
                })}
            </section>
        </main>
    );
}

export default Home;
