import axios from "axios";
import GiveStarRating from "./GiveStarRating";
import React, { useState, useEffect } from "react";

function StarsReview(props) {
    const [rating, setRating] = useState(0)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null);
    const [hasAlreadyRated, setHasAlreadyRated] = useState(false);
    const [showIsDisabled, setShowIsDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authResponse = await axios.get('/api/check-auth');
                const { isAuthenticated } = authResponse.data;
                setLoggedIn(isAuthenticated);
            } catch (err) {
                console.error('Error checking authentication status: ', err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get("/userid");
                const { userId } = response.data;
                setUserId(userId);
                
            } catch (err) {
                console.error("Error getting user's id: ", err);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const checkHasAlreadyRated = async () => {
            try {
                const body = {
                    userId: userId,
                    productId: props.productId,
                }

                const response = await axios.post("/has-user-already-cheked", body, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const { hasAlreadyRated } = response.data;
                setHasAlreadyRated(hasAlreadyRated);
            } catch (err) {
                console.error("Error checking if user has already rated this product: ", err);
            }
        };

        if (userId) {
            checkHasAlreadyRated();
        }
    }, [userId, props.productId]);

    console.log(hasAlreadyRated)

    useEffect(() => {
        const fetchUserProductRating = async () => {
            try {
                const body = {
                    userId: userId,
                    productId: props.productId,
                };
    
                const response = await axios.post("/user-product-rating", body, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const { rating } = response.data;
                setRating(rating);
            } catch (err) {
                console.error("Error retrieving this product's rating: ", err);
            }
        };
    
        if (userId && props.productId) {
            fetchUserProductRating();
        }
    }, [userId, props.productId]);
    

    const changeRating = (newRating) => setRating(newRating);
    const showIsDisabledFunc = () => setShowIsDisabled(true);
    const submitRating = async () => {
        try {
            const body = {
                userId: userId,
                productId: props.productId,
                rating: rating,
            }
            const response = await axios.post("/product/rating", body);

            if (response.data.error && response.status === 500) {
                console.log(response.data.error.message);
                setError(response.data.error.message);
            }
            
        } catch (err) {
            console.log(err);
            setError("Something went wrong when submitting your review.");
        }
    };

    return (
        <div className="stars-review-container" >
            {hasAlreadyRated ? <h3 className="stars-review-title" >Thank you for rating!</h3> : <h3 className="stars-review-title" >Share your opinion.</h3>}
            {error && <p className="error rating-error">{error}</p>}
            {(hasAlreadyRated || rating || !isLoggedIn) && showIsDisabled &&  <p className="error rating-error">You can't rate</p> }
            <GiveStarRating initialRating={rating} onRatingChange={changeRating} />
            {rating && isLoggedIn && !hasAlreadyRated ? 
            <button className="stars-review-button" onClick={submitRating} >Submit Review</button> :
            <button className="stars-review-button" onClick={showIsDisabledFunc}>Submit Review</button>}
        </div>
    );
}

export default StarsReview;
