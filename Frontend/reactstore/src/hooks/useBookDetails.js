import { useState, useEffect } from 'react';
import booksService from '../services/book/booksService';

export const useBookDetails = (bookId) => {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            setIsLoading(true);
            try {
                const fetchedBook = await booksService.getBookById(bookId);
                setBook(fetchedBook.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
            setIsLoading(false);
        };

        fetchBookDetails();
    }, [bookId]);

    return { book, isLoading };
};
