import React from 'react';
import BookItem from './BookItem';
import { useFetch } from '../hooks/useFetch';
import booksService from '../services/booksService';

const BookList = () => {
    const { data: books, loading, error } = useFetch(booksService.getAllBooks);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading books</div>;

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.bookId} book={book} />
            ))}
        </div>
    );
};

export default BookList;