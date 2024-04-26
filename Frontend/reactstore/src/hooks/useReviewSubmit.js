import { useState } from 'react';
import reviewsService from '../services/book/reviewsService';
import booksService from '../services/book/booksService';
import { useDispatch } from 'react-redux';
import { addReview } from '../store/reviewActions';

export const useReviewSubmit = (bookId, userId, navigate) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState({
        headline: '',
        reviewText: '',
        rating: 0,
    });

    const handleReviewChange = (changes) => {
        setReview(prev => ({ ...prev, ...changes }));
    };
    const handleSubmitReview = async () => {
        if (!userId) {
            alert('Please log in to submit a review.');
            return;
        }

        const reviewData = {
            Headline: review.headline,
            ReviewText: review.reviewText,
            Rating: review.rating,
            BookId: bookId,
            UserId: userId
        };

        try {
            const response = await reviewsService.createReview(reviewData);
            await booksService.incrementReviewCount(bookId);
            alert('Review submitted successfully!');
            dispatch(addReview(response.data)); 
            navigate(`/`); 
        } catch (error) {
            console.error('Failed to submit review:', error);
            if (error.response && error.response.data) {
                alert(`Failed to submit review. Server responded with: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Failed to submit review. Please try again.');
            }
        }
    };

    return { review, handleReviewChange, handleSubmitReview };
};