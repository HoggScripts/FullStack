import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarsReview = ({ rating, onRatingChange }) => {
    return (
        <div className="flex justify-center">
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={star <= rating ? solidStar : regularStar}
                        onClick={() => onRatingChange(star)}
                        className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-500 transition-colors duration-150`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StarsReview;

