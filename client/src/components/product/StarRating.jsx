import React, { useState } from 'react';

function StarRating({ initialRating = 0, onRatingChange }) {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} onClick={() => handleStarClick(value)} />
      ))}
    </div>
  );
}

function Star({ filled, onClick }) {
  return (
    <span className="rating-star" style={{ color: filled ? '#204969' : 'lightgray', cursor: 'pointer' }} onClick={onClick}>
      &#9733;
    </span>
  );
}

export default StarRating;
