import React from 'react';

const Logo = () => {
    return (
        <img src={process.env.PUBLIC_URL + '/Logo.webp'} alt="Company Logo" />
    );
};

export default Logo;