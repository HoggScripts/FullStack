import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarsReview from "../../components/DetailedBookDisplay/StarsReview";
import TextReview from "../../components/DetailedBookDisplay/TextReview";
import booksService from "../../services/booksService";
import reviewsService from '../../services/reviewsService';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useSelector} from "react-redux";
import UserReviews from "../../components/DetailedBookDisplay/UserReviews";


const DetailedBookItem = () => {
    const { bookId } = useParams();

        const user = useSelector(state => state.user);

    const [book, setBook] = useState(null);
    const [review, setReview] = useState({
        headline: '',
        reviewText: '',
        rating: 0,
    });
    const { addToCart } = useShoppingCart();

    useEffect(() => {
        booksService.getBookById(bookId)
            .then(fetchedBook => {
                setBook(fetchedBook.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [bookId]);

    const handleReviewChange = (changes) => {
        setReview(prev => ({ ...prev, ...changes }));
    };

    console.log('User:', user);
    const handleSubmitReview = async () => {
        const reviewData = {
            Headline: review.headline,
            ReviewText: review.reviewText,
            Rating: review.rating,
            BookId: bookId,
            UserId: user.id // This should be dynamically set based on the logged-in user
        };

        try {
            const response = await reviewsService.createReview(reviewData);
            console.log('Review submitted successfully:', response.data);
            alert('Review submitted successfully!');
            // Reset the review state if necessary or handle other UI changes
            setReview({
                headline: '',
                reviewText: '',
                rating: 0,
            });

            // Increment the review count of the book
            await booksService.incrementReviewCount(bookId);
            console.log('Book review count incremented successfully');
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    const handleAddToCart = () => {
        addToCart(book);
    };

    if (!book) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-xl text-gray-500">Loading...</div>
        </div>;
    }

    return (
        <div className="flex justify-center items-center bg-black min-h-screen">
            <div className="bg-gray-100 w-1/2 max-w-sm md:max-w-lg lg:max-w-xl p-4 shadow-lg rounded-lg my-5">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="w-full md:w-1/2 p-3 border-3 border-blue-500">
                        <img
                            src={`${process.env.PUBLIC_URL}${book.coverImageUrl}`}
                            alt={book.title}
                            className="w-full h-auto shadow-xl rounded-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-4 flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
                        <h2 className="text-xl text-gray-600 mt-2">
                            {book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'No authors'}
                        </h2>
                        <p className="text-gray-700 mt-4">{book.description}</p>
                        <p className="text-lg font-semibold text-gray-800 mt-4">Price: ${book.price}</p>
                        <StarsReview rating={review.rating} onRatingChange={(rating) => handleReviewChange({ rating })}/>
                        <p>Total reviews: {book.reviewCount}</p>
                        <TextReview review={review} onReviewChange={handleReviewChange} onSubmit={handleSubmitReview}/>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                            Add to Cart
                        </button>
                        <UserReviews book={book} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedBookItem;




