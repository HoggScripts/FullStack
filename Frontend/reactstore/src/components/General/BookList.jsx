import React, { useEffect, useState } from 'react';
import BookItem from "../Carousel/BookItem";
import {useFetch} from "../../hooks/useFetch";
import booksService from "../../services/booksService";

const BookList = ({ filter, searchQuery }) => {
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
                case 'search':
                    if (searchQuery) {
                        setFilteredBooks(books.filter(book =>
                            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            book.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
                        ));
                    }
                    break;
                case 'all':
                default:
                    setFilteredBooks(books);
                    break;
            }
        }
    }, [books, filter, searchQuery]);

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