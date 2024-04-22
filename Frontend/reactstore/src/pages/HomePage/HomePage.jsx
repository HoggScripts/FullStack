import React, { useState } from 'react';
import ScrollBanner from "../../components/HomePage/ScrollBanner/ScrollBanner";
import BookListCarousel from "../../components/HomePage/Carousel/BookListCarousel";
import ChangingButton from "../../components/HomePage/Carousel/ChangingButton";
import { LabelIndexContext } from "../../context/labels/LabelIndexContext";

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
                            className="w-full"
                        />
                        <div
                            className="absolute bottom-1 w-full" // Positioned absolutely
                            style={{transform: 'translateY(-40%)', zIndex: 2}}
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