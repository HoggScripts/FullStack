import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import accountsService from "../../../services/user/accountsService";
import usersService from "../../../services/user/usersService";

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullAddress = `${address}, ${apartment}, ${city}, ${province}, ${postalCode}`;

        const user = {
            firstName,
            lastName,
            userName,
            address: fullAddress,
            email,
            password,
        };

        try {
            await usersService.createUser(user);
            await accountsService.register({
                Email: email,
                Password: password,
            });

   
            alert('Registration successful! Please check your email to verify your account.');
            navigate('/');

        } catch (error) {
            console.error('Error creating and registering user', error);
            alert(`Failed to register. Error: ${error.message}. Please try again.`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow space-y-4">
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">First Name:</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Last Name:</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">User Name:</label>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Address:</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Apartment:</label>
                <input type="text" value={apartment} onChange={e => setApartment(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">City:</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Province:</label>
                <select value={province} onChange={e => setProvince(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700">
                    {provinces.map((province) => (
                        <option key={province} value={province}>
                            {province}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Postal Code:</label>
                <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-gray-600 py-2">Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-gray-700" />
            </div>
            <input type="submit" value="Sign Up" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer" />
        </form>
    );
};

export default SignUpForm;

