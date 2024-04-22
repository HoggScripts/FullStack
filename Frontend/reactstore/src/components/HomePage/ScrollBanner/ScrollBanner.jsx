import React from 'react';
import './ScrollBanner.css';

const promotions = [
    "Discover the latest Manga!",
    "Use the genre button to select different genres and categories!",
    "Explore new Anime releases!",
    "Review your favorite books!",
    "Use the shopping cart to buy books!",
    "Sign up today!",
    "Use the search bar to find books, authors, and genres!",
];

const ScrollBanner = () => {
    const [activePromotionIndex, setActivePromotionIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActivePromotionIndex((current) =>
                current === promotions.length - 1 ? 0 : current + 1
            );
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white text-indigo-500 px-4 py-1 rounded-full w-4/5 mx-auto border-animation">
            <div className="text-center text-lg font-semibold" style={{ fontFamily: "'Shojumaru', cursive" }}>
                {promotions[activePromotionIndex]}
            </div>
        </div>
    );
};

export default ScrollBanner;
