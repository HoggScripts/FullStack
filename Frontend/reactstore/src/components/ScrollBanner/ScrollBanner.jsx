import React from 'react';
import './ScrollBanner.css'; // Assuming you have an external CSS file

const promotions = [
    "Discover the latest Manga!",
    "Explore new Anime releases!",
    "Exclusive merchandise available!",
    "Sign up for our newsletter and get 10% off!"
];

const ScrollBanner = () => {
    const [activePromotionIndex, setActivePromotionIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActivePromotionIndex((current) =>
                current === promotions.length - 1 ? 0 : current + 1
            );
        }, 3000); // Change phrase every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white text-indigo-500 px-2 py-1 rounded-full w-4/5 mx-auto border-animation">
            <div className="text-center text-lg font-semibold" style={{ fontFamily: "'Shojumaru', cursive" }}>
                {promotions[activePromotionIndex]}
            </div>
        </div>
    );
};

export default ScrollBanner;