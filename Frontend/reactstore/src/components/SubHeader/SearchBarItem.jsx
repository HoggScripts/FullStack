import React from 'react';

const SearchBookItem = ({ book }) => {
    return (
        <div className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-black transform transition duration-300 hover:scale-105">
            <div className="flex justify-center items-center bg-gray-100">
                <img
                    src={`${process.env.PUBLIC_URL}${book.coverImageUrl}`}
                    alt={book.title}
                    className="w-60 h-80 object-cover"
                />
            </div>
            <div className="text-center py-1 bg-white shadow-2xl">
                <p className="text-indigo-500 font-semibold text-sm">{book.title}</p>
                <p className="text-gray-500 text-xs">{book.authors.join(', ')}</p>
                <p className="text-gray-500 text-xs">{book.genres.join(', ')}</p>
            </div>
            <div className="text-center py-2">
                <div className="inline-block bg-indigo-500 text-white py-1 px-4 rounded-full shadow-md">
                    <p className="font-semibold text-sm"> Add to Cart ${book.price}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchBookItem;