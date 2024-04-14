import React from 'react';
import { Button } from 'react-bootstrap';
import './HomeHeader.css'; // Import the CSS file

const LogOutButton = ({ onClick }) => {
    return (
        <Button onClick={onClick} variant="dark" className="bg-black">
            Log Out
        </Button>
    );
};

export default LogOutButton;