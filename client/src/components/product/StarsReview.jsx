import GiveStarRating from "./GiveStarRating";
import React, { useState } from "react";

function StarsReview() {
    const [rating, setRating] = useState(0)
    return (
        <div className="stars-review-container" >
            <h3 className="stars-review-title" >Share your opinion.</h3>
            <GiveStarRating />
            <button className="stars-review-button" >Submit Review</button>
        </div>
    );
}

export default StarsReview;
