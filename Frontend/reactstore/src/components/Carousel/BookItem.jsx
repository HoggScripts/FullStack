import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';

const BookItem = ({ book }) => {
    const { addToCart } = useShoppingCart();

    const handleAddToCart = (event) => {
        event.preventDefault(); // Prevents navigating to the link
        addToCart(book);
    };

    return (
        <div className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <Link to={`/book/${book.bookId}`} className="block">
                {/* Image on top */}
                <div className="flex justify-center items-center bg-gray-100 h-80">
                    <img
                        src={`${process.env.PUBLIC_URL}${book.coverImageUrl}`}
                        alt={book.title}
                        className="max-w-full h-full object-cover"
                    />
                </div>
            </Link>

            {/* Book details, possibly including title if needed */}

            {/* Add to Cart button */}
            <div className="p-4 bg-black">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-indigo-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default BookItem;
