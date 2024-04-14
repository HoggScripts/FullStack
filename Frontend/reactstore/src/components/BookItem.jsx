import React from 'react';

const BookItem = ({ book }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-xl transform transition duration-300 hover:scale-105">
            {/* Image on top */}
            <div className="flex justify-center items-center">
                <img src={`${process.env.PUBLIC_URL}${book.coverImageUrl}`} alt={book.title}
                     className="w-60 h-70 object-cover rounded-lg border-1 border-gray"/>
            </div>

            {/* Indigo element for the book title */}
            <div className="flex justify-center items-center mt-2">
                <div className="bg-indigo-500 text-white px-1 py-0.5 text-center rounded-5 shadow-md border-2 border-indigo-700 w-100">
                    <h2 className="font-bold text-lg">{book.title}</h2>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-4"></div>

            {/* Orange element for the price */}
            <div className="flex justify-center items-center mb-2">
                <div className="bg-orange-500 text-white px-3 py-1 text-center shadow-md border-2 border-orange-700">
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