import React, { useEffect, useState } from 'react';
import SearchBarItem from "./SearchBarItem";// Import SearchBookItem instead of BookItem
import { useFetch} from "../../hooks/useFetch";
import booksService from "../../services/booksService";

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
        <div className="flex flex-wrap justify-center bg-black">
            {filteredBooks.map((book) => (
                <div className="w-1/4 p-4">
                    <SearchBarItem key={book.bookId} book={book} /> {/* Use SearchBookItem here */}
                </div>
            ))}
        </div>
    );
};

export default SearchResultsList;