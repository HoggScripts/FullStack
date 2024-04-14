import React from 'react';

const BookItem = ({ book }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg">
            {/* Image on top */}
            <div className="flex justify-center items-center">
            <img src={`${process.env.PUBLIC_URL}${book.coverImageUrl}`} alt={book.title}
                 className="w-75 h-80 object-cover"/>
            </div>

            {/* Indigo element for the book title */}
            <div className="bg-indigo-500 text-white p-1 text-center rounded-xl">
                <h2 className="font-bold text-lg">{book.title}</h2>
            </div>

            {/* Spacer */}
            <div className="h-4"></div>

            {/* Orange element for the price */}
            <div className="flex justify-center items-center">
                <div className="bg-orange-500 text-white p-1 text-center rounded-xl w-1/2">
                    <p className="font-semibold text-sm">${book.price}</p>
                </div>
            </div>
        </div>
    );
};

export default BookItem;


// import React from 'react';
//
// const BookItem = ({ book }) => {
//     const authors = book.authors ? book.authors.join(', ') : '';
//     const genres = book.genres ? book.genres.join(', ') : '';
//
//     return (
//         <div className="book-item">
//             <img src={`${process.env.PUBLIC_URL}${book.coverImageUrl}`} alt={book.title} />
//             <h2>{book.title}</h2>
//             <h3>{authors}</h3>
//             <p>{book.description}</p>
//             <p>${book.price}</p>
//             <p>{genres}</p>
//         </div>
//     );
// };
//
// export default BookItem;