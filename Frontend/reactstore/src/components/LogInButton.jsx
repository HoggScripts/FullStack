// LogInButton.jsx
import React from 'react';
import Button from './UI/Button';

const LogInButton = ({ onClick }) => (
    <Button textColor="white" buttonColor="blue" label="Log In" onClick={onClick} />
);

export default LogInButton;