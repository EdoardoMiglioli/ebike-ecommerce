import React, { useState, useEffect } from 'react';

function GiveStarRating({ initialRating, onRatingChange }) {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleStarClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="give-rating-stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} onClick={() => handleStarClick(value)} />
      ))}
    </div>
  );
}

function Star({ filled, onClick }) {
  return (
    <span className="give-rating-star" style={{ color: filled ? '#204969' : 'lightgray', cursor: 'pointer' }} onClick={onClick}>
      &#9733;
    </span>
  );
}

export default GiveStarRating;
