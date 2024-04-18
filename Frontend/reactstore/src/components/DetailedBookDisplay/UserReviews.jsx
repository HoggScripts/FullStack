import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import reviewsService from '../../services/reviewsService';
import usersService from "../../services/usersService"; // Assuming this is the correct path

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
        <div className="mt-8 mx-4 md:mx-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reader Reviews</h2>
            {reviews.map((review, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 transition duration-300 ease-in-out hover:shadow-lg">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{review.userFirstName || 'Anonymous'}</h3>
                            <p className="font-medium text-gray-600">{review.headline}</p>
                            <p className="text-sm text-gray-700 mt-2">{review.reviewText}</p>
                        </div>
                        <div className="flex items-center ml-4">
                            {[1, 2, 3, 4, 5].map((star, idx) => (
                                <FontAwesomeIcon
                                    key={idx}
                                    icon={star <= review.rating ? solidStar : regularStar}
                                    className="text-yellow-400 mr-1"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserReviews;
