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
                <span>私は本がとても好きです！</span> 
            </div>
            <div className="flex items-center space-x-4 justify-end w-full"> 
                <div className="flex items-center space-x-4"> 
                    <SocialMediaIcons />
                </div>
                <SearchBar onSearch={handleSearch} />
            </div>
            <BookList filter={{ type: 'search' }} searchQuery={searchQuery} />
        </div>
    );
};

export default SubHeader;