import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser} from "../../../context/users/UserAction";
import accountsService from "../../../services/user/accountsService";
import usersService from "../../../services/user/usersService";
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LogInCard = ({ show, onClose, onSuccessfulLogin }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null); // New state variable for login error

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await accountsService.login({ Email: email, Password: password });
            console.log(response.data);

            const userResponse = await usersService.getUserByEmail(email);
            console.log(userResponse.data);

            dispatch(loginUser(userResponse.data));

            onSuccessfulLogin(response.data, email);
            onClose();
        } catch (error) {
            console.error('Login failed', error);
            setLoginError('Login failed. Please check your email and password.'); // Set login error message
        }
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loginError && <div className="alert alert-danger">{loginError}</div>} {/* Display login error message */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Submit
                        </Button>
                    </div>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/signup" className="text-primary" onClick={onClose}>Not a user yet? Sign up here!</Link>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LogInCard;