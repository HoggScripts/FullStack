import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import SubHeader from '../../components/SubHeader/SubHeader';
import ScrollBanner from '../../components/ScrollBanner/ScrollBanner';
import BookListCarousel from "../../components/BookDisplays/BookListCarousel";

const HomePage = () => {
    return (
        <div className="relative">
            <HomeHeader/>
            <SubHeader/>
            {/* Container for image and ScrollBanner */}
            <div className="bg-black relative mb-6">
                <img
                    src={`${process.env.PUBLIC_URL}/1.jpeg`}
                    alt="Otaku Books"
                    className="w-full h-1/2 md:h-32 object-contain"
                />
                {/* Position ScrollBanner at the bottom of the image container */}
                <div
                    className="absolute bottom-1 w-full"
                    style={{transform: 'translateY(-50%)', zIndex: 10}}
                >
                    <ScrollBanner/>
                </div>
            </div>
            <div>
                <BookListCarousel filter={{type: 'genre', value: 'Discounted'}}/>
                <BookListCarousel filter={{type: 'genre', value: 'Staff Picks'}}/>
                <BookListCarousel filter={{type: 'genre', value: 'Best Sellers'}}/>
            </div>
        </div>
    );
};

export default HomePage;

