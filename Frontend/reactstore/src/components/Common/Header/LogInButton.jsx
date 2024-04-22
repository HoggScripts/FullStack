import React from 'react';
import { Button } from 'react-bootstrap';
import LogInCard from './LogInCard';
import './HomeHeader.css'; 

const LogInButton = ({ onSuccessfulLogin }) => {
    const [show, setShow] = React.useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button onClick={handleShow} variant="dark" className="bg-black">
                Log In
            </Button>
            <LogInCard show={show} onClose={handleClose} onSuccessfulLogin={onSuccessfulLogin} />
        </>
    );
};

export default LogInButton;
