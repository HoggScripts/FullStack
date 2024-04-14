import React from 'react';
import SocialMediaIcons from '../SubHeader/SocialMediaIcons';
import SearchBar from './SearchBar';

const SubHeader = () => {
    return (
        <div className="bg-indigo-500 p-3 flex items-center justify-between text-white">
            <div>
                <span>私は本がとても好きです！</span> {/* Japanese text to the left */}
            </div>
            <div className="flex items-center space-x-4"> {/* Encapsulating SocialMediaIcons and SearchBar together */}
                <SocialMediaIcons />
                <SearchBar />
            </div>
        </div>
    );
};

export default SubHeader;
