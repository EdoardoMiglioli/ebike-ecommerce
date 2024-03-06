import React from "react";

function SortProducts({ sortBy, onSortChange }) {
    const handleSortChange = (event) => {
        const selectedSortBy = event.target.value;
        onSortChange(selectedSortBy);
    };
    
    return (
        <div>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="id">Featured</option>
          <option value="name ASC">A to Z</option>
          <option value="name DESC">Z to A</option>
          <option value="price DESC">Price: higher to lower</option>
          <option value="price ASC">Price: lower to higher</option>
        </select>
        </div>
    );
}

export default SortProducts;
