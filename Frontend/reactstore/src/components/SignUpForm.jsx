import React, { useState } from 'react';
import accountsService from '../services/accountsService';
import usersService from '../services/usersService';

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState(''); // New state for username
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fullAddress = `${address}, ${apartment}, ${city}, ${province}, ${postalCode}`;

        const user = {
            firstName,
            lastName,
            userName, // Include username in the user object
            address: fullAddress,
            email,
            password,
        };

        try {
            const response = await usersService.createUser(user);
            console.log(response.data);

            const registerResponse = await accountsService.register({
                Email: email,
                Password: password,
            });
            console.log(registerResponse.data);
        } catch (error) {
            console.error('Error creating and registering user', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </label>
            <label>
                User Name: {/* New input field for username */}
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} required />
            </label>
            <label>
                Address:
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
            </label>
            <label>
                Apartment:
                <input type="text" value={apartment} onChange={e => setApartment(e.target.value)} />
            </label>
            <label>
                City:
                <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
            </label>
            <label>
                Province:
                <select value={province} onChange={e => setProvince(e.target.value)} required>
                    {provinces.map((province) => (
                        <option key={province} value={province}>
                            {province}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Postal Code:
                <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <input type="submit" value="Sign Up" />
        </form>
    );
};

export default SignUpForm;