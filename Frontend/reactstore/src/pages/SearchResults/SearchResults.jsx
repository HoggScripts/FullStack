import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResultsList from "../../components/Common/SubHeader/SearchResultsList";

const SearchResults = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        setSearchQuery(query || '');
    }, [location.search]);

    return (
        
        <div className="bg-black">
            <h1>Search Results for "{searchQuery}"</h1>
            <SearchResultsList searchQuery={searchQuery} />
        </div>
    );
};

export default SearchResults;