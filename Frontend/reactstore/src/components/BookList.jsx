import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import booksService from '../services/booksService';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await booksService.getAllBooks();
            setBooks(response.data);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.bookId} book={book} />
            ))}
        </div>
    );
};

export default BookList;