import React, { useState } from 'react';

const ChangingButton = ({ handleClick, labels, index }) => {
    const [isFlipping, setIsFlipping] = useState(false);

    const handleClickAndFlip = () => {
        setIsFlipping(true);
        setTimeout(() => setIsFlipping(false), 1000); 
        handleClick();
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={handleClickAndFlip}
                className={`bg-gradient-to-r from-indigo-400 to-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 active:bg-teal-600 ${isFlipping ? 'animate-flip' : ''}`}
            >
                {labels[index]}
            </button>
        </div>
    );
};

export default ChangingButton;