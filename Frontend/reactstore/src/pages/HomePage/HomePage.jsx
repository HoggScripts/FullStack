import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import SubHeader from '../../components/SubHeader/SubHeader';
import ScrollBanner from '../../components/ScrollBanner/ScrollBanner';
import BookListCarousel from "../../components/BookDisplays/BookListCarousel";

const HomePage = () => {
    return (
        <div className="relative">
            <HomeHeader />
            <SubHeader />
            {/* Container for image and ScrollBanner */}
            <div className="relative mb-6">
                <img
                    src={`${process.env.PUBLIC_URL}/Background1.webp`}
                    alt="Otaku Books"
                    className="w-full md:h-64"
                />
                {/* Position ScrollBanner at the bottom of the image container */}
                <div
                    className="absolute bottom-1 w-full"
                    style={{transform: 'translateY(-50%)', zIndex: 10}}
                >
                    <ScrollBanner/>
                </div>
            </div>
            {/* Use the BookListCarousel component */}
            <BookListCarousel filter={{type: 'all'}}/>
        </div>
    );
};

export default HomePage;

