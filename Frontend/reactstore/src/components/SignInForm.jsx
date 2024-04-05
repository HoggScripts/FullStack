import React, { useState } from 'react';
import accountsService from '../services/accountsService';

const SignInForm = () => {
    const [email, setEmail] = useState(''); // Change userName to email
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            Email: email, // Change userName to Email
            Password: password,
        };

        try {
            const response = await accountsService.login(user);
            console.log(response.data);
        } catch (error) {
            console.error('Error signing in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email: {/* Change User Name to Email */}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <input type="submit" value="Sign In" />
        </form>
    );
};

export default SignInForm;