import React, { useState } from 'react';

function StarRating({ rating }) {

  return (
    <div className="product-rating-stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} />
      ))}
    </div>
  );
}

function Star({ filled }) {
  return (
    <span className="product-rating-star" style={{ color: filled ? '#204969' : 'lightgray', cursor: 'pointer' }} >
      &#9733;
    </span>
  );
}

export default StarRating;
