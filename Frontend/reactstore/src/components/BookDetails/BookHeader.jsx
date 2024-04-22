// BookHeader.jsx
const BookHeader = ({ book }) => (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{book.title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{book.authors.join(', ')}</p>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{book.genres.join(', ')}</p>
    </div>
);

// BookDetails.jsx
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
