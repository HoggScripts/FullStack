import React, { useEffect, useState } from 'react';
import BookItem from '../BookItem';
import { useFetch } from '../../hooks/useFetch';
import booksService from "../../services/booksService";

const BookListCarousel = ({ filter }) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { data: books, loading, error } = useFetch(booksService.getAllBooks);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (books) {
            let newFilteredBooks;
            switch (filter.type) {
                case 'author':
                    newFilteredBooks = books.filter(book => book.authors.map(author => author.toLowerCase()).includes(filter.value.toLowerCase()));
                    break;
                case 'genre':
                    newFilteredBooks = books.filter(book => book.genres.map(genre => genre.toLowerCase()).includes(filter.value.toLowerCase()));
                    break;
                case 'all':
                default:
                    newFilteredBooks = books;
                    break;
            }
            const itemsNeeded = 4 - (newFilteredBooks.length % 4);
            if (itemsNeeded !== 4) {
                newFilteredBooks = [...newFilteredBooks, ...newFilteredBooks.slice(0, itemsNeeded)];
            }
            setFilteredBooks(newFilteredBooks);
            setActiveIndex(0);
        }
    }, [books, filter]);

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error loading books</div>;

    const chunks = [];
    for (let i = 0; i < filteredBooks.length; i += 4) {
        chunks.push(filteredBooks.slice(i, i + 4));
    }

    const handlePrev = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + chunks.length) % chunks.length);
    };

    const handleNext = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % chunks.length);
    };

    return (
        <div id="bookCarousel" className="carousel slide bg-black" data-ride="carousel">
            <div className="carousel-inner p-10">
                {chunks.map((chunk, index) => (
                    <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
                        <div className="grid grid-cols-4 gap-4">
                            {chunk.map((book, idx) => (
                                <div className="col-span-1" key={idx}>
                                    <BookItem book={book}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                onClick={handlePrev}>
                <span className="text-4xl" aria-hidden="true">‹</span>
            </button>
            <button
                className="carousel-control-next"
                onClick={handleNext}>
                <span className="text-4xl" aria-hidden="true">›</span>
            </button>
        </div>
    );
};

export default BookListCarousel;

