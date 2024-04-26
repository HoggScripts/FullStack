import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useBookDetails } from "../../hooks/useBookDetails";
import { useReviewSubmit } from "../../hooks/useReviewSubmit";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import BookDetails from "../../components/BookDetails/BookDetails";
import BookHeader from "../../components/BookDetails/BookHeader";

const DetailedBookItem = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const userId = user ? user.id : null; // Add this line

    const { book, loading } = useBookDetails(bookId);
    const { review, handleReviewChange, handleSubmitReview } = useReviewSubmit(bookId, userId, navigate); // Modify this line
    const { addToCart } = useShoppingCart();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-xl text-gray-500">Loading...</div>
        </div>;
    }

    if (!book) {
        return <div className="text-xl text-center text-gray-500">Book not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <BookDetails
                    book={book}
                    handleAddToCart={() => addToCart(book)}
                    handleReviewChange={handleReviewChange}
                    handleSubmitReview={handleSubmitReview}
                    review={review}
                />
            </div>
        </div>
    );
};

export default DetailedBookItem;
