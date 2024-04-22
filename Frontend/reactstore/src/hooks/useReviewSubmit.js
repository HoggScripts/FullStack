import { useState } from 'react';
import reviewsService from '../services/book/reviewsService';
import booksService from '../services/book/booksService';

export const useReviewSubmit = (bookId, userId, navigate) => {
    const [review, setReview] = useState({
        headline: '',
        reviewText: '',
        rating: 0,
    });

    const handleReviewChange = (changes) => {
        setReview(prev => ({ ...prev, ...changes }));
    };

    const handleSubmitReview = async () => {
        const reviewData = {
            Headline: review.headline,
            ReviewText: review.reviewText,
            Rating: review.rating,
            BookId: bookId,
            UserId: userId
        };

        try {
            await reviewsService.createReview(reviewData);
            await booksService.incrementReviewCount(bookId);
            alert('Review submitted successfully!');
            navigate(`/`);
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    return { review, handleReviewChange, handleSubmitReview };
};
