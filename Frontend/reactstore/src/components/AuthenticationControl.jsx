// AuthenticationControl.jsx
import React, { useState } from 'react';
import LogInButton from './LogInButton';
import LogInCard from './LogInCard';

const AuthenticationControl = () => {
    const [showLogInCard, setShowLogInCard] = useState(false);

    const handleLogInButtonClick = () => {
        console.log('LogInButton was clicked'); // Add this line
        setShowLogInCard(true);
    };

    const handleLogInCardClose = () => {
        setShowLogInCard(false);
    };

    return (
        <>
            <LogInButton onClick={handleLogInButtonClick} />
            <LogInCard show={showLogInCard} onClose={handleLogInCardClose} />
        </>
    );
};

export default AuthenticationControl;