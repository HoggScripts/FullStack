// Button.jsx
import React from 'react';

const Button = ({ label, onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
        {label}
    </button>
);

export default Button;