import React from 'react';
import StarsReview from "./StarsReview";
import TextReview from "./TextReview";
import UserReviews from "./UserReviews";


const BookDetails = ({ book, handleAddToCart, handleReviewChange, handleSubmitReview, review }) => (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src={book.coverImageUrl} alt={book.title} className="w-full h-auto md:col-span-1 rounded-lg"/>
            <div className="md:col-span-2 mt-4 md:mt-0">
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="text-md font-medium mb-1">Authors: {book.authors.join(', ')}</p>
                <p className="text-md font-medium mb-1">Genres: {book.genres.join(', ')}</p>
                <p className="text-lg mb-2">{book.description}</p>
                <p className="text-gray-900 mb-2">Price: <strong>${book.price}</strong></p>
                <button onClick={handleAddToCart}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
        <div className="mt-4 pt-4">
            <StarsReview rating={review.rating} onRatingChange={(rating) => handleReviewChange({rating})}/>
            <TextReview review={review} onReviewChange={handleReviewChange} onSubmit={handleSubmitReview}/>
        </div>
        <div className="mt-4 text-center text-blue-500 p-2">
            <p className="text-sm">Total reviews: {book.reviewCount}</p>
            <p className="text-sm">Average rating: {Number(book.averageRating).toFixed(2)}</p>
        </div>
        <UserReviews book={book}/>
    </div>

);


export default BookDetails;
