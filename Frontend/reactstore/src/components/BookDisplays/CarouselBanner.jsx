import React from 'react';

const CarouselBanner = ({ filterValue }) => {
    const filterDisplay = filterValue.charAt(0).toUpperCase() + filterValue.slice(1); // Capitalizes the first letter for display

    return (
        <div className="bg-black text-white text-center p-2 shadow-lg">
            <h2 className="text-lg font-semibold">
                {filterDisplay}
            </h2>
        </div>
    );
};

export default CarouselBanner;