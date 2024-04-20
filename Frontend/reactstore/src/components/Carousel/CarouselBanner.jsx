import React from 'react';


const CarouselBanner = ({ filterValue }) => {
    const filterDisplay = filterValue.charAt(0).toUpperCase() + filterValue.slice(1); // Capitalizes the first letter for display

    return (
        <div className="bg-black flex justify-center p-4">
        <div className="bg-orange-500 text-white text-center p-1 shadow-lg rounded-3 w-1/4 border border-danger-white">
            <h2 className="text-xl font-semibold tracking-wider">
                {filterDisplay}
            </h2>
        </div>
        </div>
    );
};

export default CarouselBanner;
