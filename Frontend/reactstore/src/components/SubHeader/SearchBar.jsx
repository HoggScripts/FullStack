import React from 'react';

const SearchBar = () => {
    return (
        <div className="flex items-center justify-center">
            <form className="flex items-center">
                <input
                    type="search"
                    placeholder="Search books, authors, genres"
                    aria-label="Search"
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     className="h-6 w-6 text-orange-500 cursor-pointer ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </form>
        </div>
    );
};

export default SearchBar;