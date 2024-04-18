import React from 'react';
import HomeHeader from "../../components/Header/HomeHeader";
import SubHeader from '../../components/SubHeader/SubHeader';
import ScrollBanner from '../../components/ScrollBanner/ScrollBanner';
import BookListCarousel from "../../components/Carousel/BookListCarousel";
const HomePage = () => {
    return (
        <div className="relative">
            <div className="pt-32 pt-lg-5"> 
                <div className="bg-black">
                    <img
                        src={`${process.env.PUBLIC_URL}/1.jpeg`}
                        alt="Otaku Books"
                        className="w-full h-full object-contain"
                    />
                    <div
                        className="absolute bottom-1 w-full"
                        style={{transform: 'translateY(-50%)', zIndex: 2}}
                    >
                        <ScrollBanner/>
                    </div>
                </div>
                <div className="pt-4 bg-black">
                    <BookListCarousel filter={{type: 'genre', value: 'Discounted'}}/>
                    <BookListCarousel filter={{type: 'genre', value: 'Staff Picks'}}/>
                    <BookListCarousel filter={{type: 'genre', value: 'Best Sellers'}}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;