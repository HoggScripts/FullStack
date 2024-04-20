import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomeHeader.css'; 

const RoutingButton = ({ label, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button onClick={handleClick} variant="dark" className="bg-black">
            {label}
        </Button>
    );
};

export default RoutingButton;
