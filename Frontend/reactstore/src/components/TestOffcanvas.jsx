import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

function TestOffcanvas() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        console.log('Closing Offcanvas...');
        setShow(false);
    };

    const handleShow = () => {
        console.log('Opening Offcanvas...');
        setShow(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show Offcanvas
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Test Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    This is a test Offcanvas.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default TestOffcanvas;