import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usersService from "../../services/user/usersService";

const UserProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            usersService.getUserById(user.id)
                .then(response => {
                    setUserInfo(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                    setError('Failed to fetch user data');
                    setLoading(false);
                });
        }
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        setLoading(true);
        usersService.updateUser(user.id, userInfo)
            .then(response => {
                console.log('User info updated:', response.data);
                dispatch({ type: 'UPDATE_USER', payload: response.data });
                setLoading(false);
                setEditing(false);
            })
            .catch(error => {
                console.error('Error updating user info:', error);
                setError('Failed to update user data');
                setLoading(false);
            });
    };

    const toggleEdit = () => {
        setEditing(!editing);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-5 mx-auto rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-900 text-center">User Profile</h2>
                {!editing ? (
                    <div className="mt-4 space-y-2 text-gray-700">
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                        <p><strong>Address:</strong> {userInfo.address}</p>
                        <div className="text-center mt-4">
                            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={toggleEdit}>Edit Profile</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} className="space-y-4 mt-4">
                        <div className="form-group">
                            <label className="block mb-1 font-medium text-gray-900">Email</label>
                            <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="email" value={userInfo.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label className="block mb-1 font-medium text-gray-900">First Name</label>
                            <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="firstName" value={userInfo.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label className="block mb-1 font-medium text-gray-900">Last Name</label>
                            <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="lastName" value={userInfo.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label className="block mb-1 font-medium text-gray-900">Address</label>
                            <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="address" value={userInfo.address} onChange={handleInputChange} />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-green-600">Save Changes</button>
                            <button type="button" className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600" onClick={toggleEdit}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserProfile;



