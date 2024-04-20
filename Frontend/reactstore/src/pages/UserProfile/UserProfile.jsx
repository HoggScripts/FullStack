import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usersService from '../../services/usersService';

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
        if (user.id) {
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
    }, [user.id]);

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
        <div className="pt-4">
            <h2>User Profile</h2>
            {!editing ? (
                <div>
                    <p>Email: {userInfo.email}</p>
                    <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
                    <p>Address: {userInfo.address}</p>
                    <button className="btn btn-primary" onClick={toggleEdit}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={userInfo.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name="firstName" value={userInfo.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={userInfo.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" name="address" value={userInfo.address} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={toggleEdit}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default UserProfile;

