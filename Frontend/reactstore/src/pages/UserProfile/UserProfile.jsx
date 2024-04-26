import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usersService from "../../services/user/usersService";
import ordersService from "../../services/order/ordersService";
import { refreshTokenIfNeeded } from '../../Utility/tokenUtils';
import './Profile.css';

const UserProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
    });
    const [userOrders, setUserOrders] = useState([]);
    const [errors, setErrors] = useState({});
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleTokenValidation = async () => {
            setLoading(true);
            const tokenIsValid = await refreshTokenIfNeeded();
            if (tokenIsValid) {
                fetchUserInfo();
            } else {
                setLoading(false);
                setErrors(prev => ({ ...prev, auth: 'Authentication failed, please login again.' }));
            }
        };

        const fetchUserInfo = async () => {
            if (user && user.id) {
                try {
                    const userInfoResponse = await usersService.getUserById(user.id);
                    setUserInfo(userInfoResponse.data);
                    const ordersResponse = await ordersService.getOrdersByUserId(user.id);
                    setUserOrders(ordersResponse.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user info or orders:', error);
                    setLoading(false);
                    setErrors(prev => ({ ...prev, fetch: 'Failed to fetch user data or orders' }));
                }
            }
        };

        handleTokenValidation();
    }, [user.id, dispatch]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        return nameRegex.test(name);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value
        }));
        let error = '';
        if (name === 'email' && !validateEmail(value)) {
            error = 'Invalid email format';
        } else if ((name === 'firstName' || name === 'lastName') && !validateName(value)) {
            error = 'Name should not contain numbers or special characters';
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (Object.values(errors).some(x => x)) {
            alert("Please fix the errors before submitting.");
            return;
        }
        setLoading(true);
        try {
            const response = await usersService.updateUser(user.id, userInfo);
            console.log('User info updated:', response.data);
            dispatch({ type: 'UPDATE_USER', payload: response.data });
            setEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error);
            setErrors(prev => ({ ...prev, update: 'Failed to update user data' }));
        }
        setLoading(false);
    };

    const toggleEdit = () => {
        setEditing(!editing);
    };

    if (loading) return <div>Loading...</div>;
    if (errors.auth || errors.fetch) return <div>Error: {errors.auth || errors.fetch}</div>;

    return (
        <div className="profile items-center justify-center min-h-screen">
            <div className="flex flex-wrap justify-center gap-4">
                {/* Profile card */}
                <div className="card w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
                    {!editing ? (
                        <div className="space-y-4">
                            <h1 className="text-lg font-bold text-center">My Profile</h1>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                            <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                            <p><strong>Address:</strong> {userInfo.address}</p>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={toggleEdit}>Edit Profile</button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={userInfo.email} onChange={handleInputChange} />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" className="form-control" value={userInfo.firstName} onChange={handleInputChange} />
                                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" className="form-control" value={userInfo.lastName} onChange={handleInputChange} />
                                {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" className="form-control" value={userInfo.address} onChange={handleInputChange} />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600" disabled={Object.values(errors).some(x => x)}>Save Changes</button>
                                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={toggleEdit}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Orders card */}
                <div className="card w-2/3 max-w-md p-5 bg-white rounded-lg shadow-lg">
                    <h5 className="text-lg font-bold text-center mb-4">Your Orders</h5>
                    <div style={{ maxWidth: '400px', margin: '20 auto' }}>
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Order No.</th>
                                <th scope="col" className="py-3 px-6">Total Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userOrders.map(order => (
                                <tr key={order.orderId} className="bg-white border-b">
                                    <td className="py-4 px-6">{order.orderId}</td>
                                    <td className="py-4 px-6">${order.orderTotal.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default UserProfile;






