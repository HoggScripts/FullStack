import React from 'react';
import StarsReview from "./StarsReview";
import TextReview from "./TextReview";
import UserReviews from "./UserReviews";
const BookDetails = ({ book, handleAddToCart, handleReviewChange, handleSubmitReview, review }) => (
    <div className="px-4 py-5 sm:p-6">
        <img src={book.coverImageUrl} alt={book.title} className="w-2/3 sm:max-w-md rounded-lg shadow-lg mx-auto"/>
        <div className="mt-4">
            <button onClick={handleAddToCart}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart ${book.price}
            </button>
            <StarsReview rating={review.rating} onRatingChange={(rating) => handleReviewChange({ rating })}/>
            <TextReview review={review} onReviewChange={handleReviewChange} onSubmit={handleSubmitReview}/>
            <p className='flex justify-center'>Total reviews: {book.reviewCount}</p>
            <p className='flex justify-center'>Average rating: {Number(book.averageRating).toFixed(2)}</p>
            <UserReviews book={book}/>
        </div>
    </div>
);

export default BookDetails;