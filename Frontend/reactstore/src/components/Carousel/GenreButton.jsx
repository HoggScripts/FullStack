import React, { useState } from 'react';
import './FlipperButton.scss'; // Ensure the SCSS is properly compiled and imported

const genres = ["Action", "Romance", "Thriller", "Comedy", "Drama", "Sci-Fi"];

const FlipperButton = () => {
    const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        setFlip(true);
        setTimeout(() => {
            setCurrentGenreIndex((currentGenreIndex + 1) % genres.length);
            setFlip(false);
        }, 600); // Corresponds to the transition duration
    };

    return (
        <div className="flipper-container" onClick={handleFlip}>
            <div className={`flipper ${flip ? 'flipped' : ''}`}>
                <div className="front-face" data-icon="&#x27a3;">
                    <span data-hover="Click Me">{genres[currentGenreIndex]}</span>
                </div>
                <div className="back-face" data-icon="&#10003;">Thank You</div>
            </div>
        </div>
    );
};

export default FlipperButton;
