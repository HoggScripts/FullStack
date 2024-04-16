import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarsReview = ({ book }) => {
    const averageRating = book?.averageRating;
    const reviewCount = book?.reviewCount;

    const filledStars = averageRating ? Array(Math.round(averageRating)).fill(null) : [];
    const emptyStars = Array(5 - filledStars.length).fill(null);

    return (
        <div className="height-100 container d-flex justify-content-center align-items-center">
            <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="ratings">
                        {filledStars.map((_, index) => (
                            <FontAwesomeIcon key={index} icon={solidStar} className="rating-color" />
                        ))}
                        {emptyStars.map((_, index) => (
                            <FontAwesomeIcon key={index + filledStars.length} icon={regularStar} />
                        ))}
                    </div>
                    <h5 className="review-count">{reviewCount || 0} Reviews</h5>
                </div>
            </div>
        </div>
    );
};

export default StarsReview;