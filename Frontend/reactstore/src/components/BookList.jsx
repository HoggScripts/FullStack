import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import { useFetch } from '../hooks/useFetch';
import booksService from '../services/booksService';

const BookList = ({ filter }) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { data: books, loading, error } = useFetch(booksService.getAllBooks);

    useEffect(() => {
        if (books) {
            switch (filter.type) {
                case 'author':
                    setFilteredBooks(books.filter(book => book.authors.map(author => author.toLowerCase()).includes(filter.value.toLowerCase())));
                    break;
                case 'genre':
                    setFilteredBooks(books.filter(book => book.genres.map(genre => genre.toLowerCase()).includes(filter.value.toLowerCase())));
                    break;
                case 'all':
                default:
                    setFilteredBooks(books);
                    break;
            }
        }
    }, [books, filter]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading books</div>;

    return (
        <div>
            {filteredBooks.map((book) => (
                <BookItem key={book.bookId} book={book} />
            ))}
        </div>
    );
};

export default BookList;