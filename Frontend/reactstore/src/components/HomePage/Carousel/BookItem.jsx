import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useShoppingCart} from "../../../hooks/useShoppingCart";

const BookItem = ({ book }) => {
    const { addToCart } = useShoppingCart();

    const handleAddToCart = () => {
        addToCart(book);
    };

    return (
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden h-100 w-100">
            <div className="book-img w-3/3">
                <img src={book.coverImageUrl} alt={book.title} className="h-full w-full object-cover object-center"/>
            </div>
            <div className="book-content w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <div className="book-title text-xl font-semibold mb-2">{book.title}</div>
                    <div className="book-author text-sm text-gray-600 mb-4">by {book.authors.join(", ")}</div>
                    <div className="book-author text-sm text-gray-600 mb-4">Category: {book.genres.join(", ")}</div>
                    <div className="rate flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={star <= book.averageRating ? solidStar : regularStar}
                                className={`mr-1 ${star <= book.averageRating ? 'text-yellow-400' : 'text-gray-400'}`}
                            />
                        ))}
                        <span
                            className="text-xs text-gray-600 whitespace-nowrap">{book.reviewCount === 1 ? `${book.reviewCount} vote` : `${book.reviewCount} votes`}</span>
                    </div>
                </div>
                <div>
                    <div className="book-sum text-gray-800 text-sm mb-4 z-5">{book.description}</div>
                    <Link to={`/book/${book.bookId}`}
                          className="inline-block bg-orange-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out z-10">
                        More Details
                    </Link>
                    <button onClick={handleAddToCart} 
                            className="mt-2 inline-block bg-indigo-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out z-10">
                        Add to Cart ${book.price}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookItem;


