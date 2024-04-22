
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarsReview from "../../components/BookDetails/StarsReview";
import TextReview from "../../components/BookDetails/TextReview";
import UserReviews from "../../components/BookDetails/UserReviews";
import booksService from "../../services/book/booksService";
import { useShoppingCart} from "../../hooks/useShoppingCart";
import { useSelector } from "react-redux";
import reviewsService from "../../services/book/reviewsService";

const DetailedBookItem = () => {
    const { bookId } = useParams();
    const navigate = useNavigate(); // Using useNavigate instead of useHistory
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

    const handleSubmitReview = async () => {
        const reviewData = {
            Headline: review.headline,
            ReviewText: review.reviewText,
            Rating: review.rating,
            BookId: bookId,
            UserId: user.id
        };

        try {
            await reviewsService.createReview(reviewData);
            await booksService.incrementReviewCount(bookId);
            window.alert('Review submitted successfully!');
            navigate(`/`);
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    const handleAddToCart = () => {
        if (book) {
            addToCart(book);
        } else {
            alert('Failed to add book to cart.');
        }
    };

    if (!book) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-xl text-gray-500">Loading...</div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">{book.title}</h1>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{book.authors.join(', ')}</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{book.genres.join(', ')}</p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <img src={book.coverImageUrl} alt={book.title} className="w-2/3 sm:max-w-md rounded-lg shadow-lg mx-auto"/>
                    <div className="mt-4">
                        <button onClick={handleAddToCart}
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add to Cart ${book.price}
                        </button>

                        <StarsReview rating={review.rating} onRatingChange={(rating) => handleReviewChange({rating})}/>
                        <TextReview review={review} onReviewChange={handleReviewChange} onSubmit={handleSubmitReview}/>
                        <p className='flex justify-center'>Total reviews: {book.reviewCount}</p>
                        <p className='flex justify-center'>Average rating: {Number(book.averageRating).toFixed(2)}</p>
                        <UserReviews book={book}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedBookItem;