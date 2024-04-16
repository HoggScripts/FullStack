import React, { useState } from 'react';
import SocialMediaIcons from '../SubHeader/SocialMediaIcons';
import SearchBar from './SearchBar';
import BookList from "../General/BookList";
const SubHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="bg-indigo-500 p-3 flex items-center justify-between text-white">
            <div className="w-full">
                <span>私は本がとても好きです！</span> {/* Japanese text to the left */}
            </div>
            <div className="flex items-center space-x-4 justify-end w-full"> {/* Encapsulating SocialMediaIcons and SearchBar together */}
                <div className="flex items-center space-x-4"> {/* Grouping SocialMediaIcons together */}
                    <SocialMediaIcons />
                </div>
                <SearchBar onSearch={handleSearch} />
            </div>
            <BookList filter={{ type: 'search' }} searchQuery={searchQuery} />
        </div>
    );
};

export default SubHeader;