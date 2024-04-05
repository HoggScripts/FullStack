import React from 'react';

const BookItem = ({ book }) => {
    const authors = book.authors ? book.authors.join(', ') : '';
    const genres = book.genres ? book.genres.join(', ') : '';

    return (
        <div className="book-item">
            <img src={book.coverImageUrl} alt={book.title} />
            <h2>{book.title}</h2>
            <h3>{authors}</h3>
            <p>{book.description}</p>
            <p>${book.price}</p>
            <p>{genres}</p>
        </div>
    );
};

export default BookItem;