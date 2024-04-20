import React, { useState } from 'react';
import HomeHeader from "../../components/Header/HomeHeader";
import SubHeader from '../../components/SubHeader/SubHeader';
import ScrollBanner from '../../components/ScrollBanner/ScrollBanner';
import BookListCarousel from "../../components/Carousel/BookListCarousel";
import ChangingButton from "../../components/Carousel/ChangingButton";
import { LabelIndexContext } from "../../context/LabelIndexContext";

const HomePage = () => {
    const labels = ['Best Sellers', 'Staff Picks', 'New Release', 'Fantasy', 'Sci-Fi', 'Adventure', 'Romance', 'Mystery', 'Comedy', 'Slice of Life', 'Sports', 'Discounted'];
    const [indices, setIndices] = useState([0, 4, 6]); 

    const handleClick = (carouselIndex) => {
        setIndices(indices => {
            const newIndices = [...indices];
            newIndices[carouselIndex] = (newIndices[carouselIndex] + 1) % labels.length;

         
            while (newIndices.some((value, index) => index !== carouselIndex && value === newIndices[carouselIndex])) {
                newIndices[carouselIndex] = (newIndices[carouselIndex] + 1) % labels.length;
            }

            return newIndices;
        });
    };

    return (
        <LabelIndexContext.Provider value={{ indices, handleClick }}>
            <div className="">
                <div className="">
                    <div className="bg-black">
                        <img
                            src={`${process.env.PUBLIC_URL}/1.jpeg`}
                            alt="Otaku Books"
                            className="w-full bg-black"
                        />
                        <div
                            className="absolute bottom-1 w-full bg-black"
                            style={{transform: 'translateY(-50%)', zIndex: 2}}
                        >
                            <ScrollBanner/>
                        </div>
                    </div>
                    <div className=" bg-black space-y-4">
                        <ChangingButton handleClick={() => handleClick(0)} labels={labels} index={indices[0]}/>
                        <BookListCarousel filter={{type: 'genre', value: labels[indices[0]]}}/>
                        <ChangingButton handleClick={() => handleClick(1)} labels={labels} index={indices[1]}/>
                        <BookListCarousel filter={{type: 'genre', value: labels[indices[1]]}}/>
                        <ChangingButton handleClick={() => handleClick(2)} labels={labels} index={indices[2]}/>
                        <BookListCarousel filter={{type: 'genre', value: labels[indices[2]]}}/>
                    </div>
                </div>
            </div>
        </LabelIndexContext.Provider>
    );
};

export default HomePage;