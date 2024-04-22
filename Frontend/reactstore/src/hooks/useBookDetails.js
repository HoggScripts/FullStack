import { useState, useEffect } from 'react';
import booksService from '../services/book/booksService';

export const useBookDetails = (bookId) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchBook = async () => {
            try {
                const fetchedBook = await booksService.getBookById(bookId);
                setBook(fetchedBook.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book:', error);
                setLoading(false); // Ensure loading is set to false even on error
            }
        };

        if (bookId) {
            fetchBook();
        }
    }, [bookId]);

    return { book, loading }; // Always return an object with both properties
};
