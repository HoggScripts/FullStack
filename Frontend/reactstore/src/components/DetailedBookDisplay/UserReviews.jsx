import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import reviewsService from '../../services/reviewsService';
import usersService from '../../services/usersService';

const UserReviews = ({ book }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            console.log(`BOOK HERE: ${book.bookId}`);
            let reviewsWithUser = [];
            try {
                const response = await reviewsService.getReviewsByBookId(book.bookId);
                console.log('Received reviews:', response.data); // Log the received reviews
                reviewsWithUser = await Promise.all(response.data.map(async review => {
                    if (!review.userId) {
                        console.error('Review does not have a userId:', review);
                        return review;
                    }
                    try {
                        const user = await usersService.getUserById(review.userId);
                        if (!user || !user.data || !user.data.firstName) {
                            console.error('Failed to fetch user or user does not have a firstName:', user);
                            return review;
                        }
                        return { ...review, userFirstName: user.data.firstName };
                    } catch (error) {
                        console.error(`Failed to fetch user with ID ${review.userId}:`, error);
                        return review;
                    }
                }));
                setReviews(reviewsWithUser);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log('No reviews found for this book.');
                    setReviews([]);
                } else {
                    console.error('An error occurred while fetching reviews:', error);
                }
            }
            finally {
                reviewsWithUser.forEach(review => {
                    console.log(review);
                });
            }
        };

        fetchReviews();
    }, [book]);
    if (reviews.length === 0) {
        return <p>No reviews found for this book.</p>;
    }

    return (
        <div>
            {reviews.map((review, index) => (
                <div key={index}>
                    <h2>{review.userFirstName}</h2>
                    <h3>{review.headline}</h3>
                    <p>{review.reviewText}</p>
                    <div>
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={star <= review.Rating ? solidStar : regularStar}
                                className={`cursor-pointer ${star <= review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserReviews;