import React, { useEffect, useState } from 'react';
import SearchBarItem from "./SearchBarItem";
import { useFetch } from "../../hooks/useFetch";
import booksService from "../../services/booksService";
import BookItem from "../Carousel/BookItem";

const SearchResultsList = ({ searchQuery }) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { data: books, loading, error } = useFetch(booksService.getAllBooks);

    useEffect(() => {
        if (books) {
            setFilteredBooks(books.filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
                book.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
            ));
        }
    }, [books, searchQuery]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading books</div>;

    return (
        <div className="p-4 rounded-lg grid grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
                <div key={book.bookId}>
                    <BookItem book={book} />
                </div>
            ))}
        </div>
    );
};

export default SearchResultsList;