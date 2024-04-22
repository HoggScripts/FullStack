import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import { loginUser, logoutUser } from "../../../context/users/UserAction";
import usersService from "../../../services/user/usersService";

const AuthenticationControl = ({ className }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSuccessfulLogin = (userData, email) => {
        // Assuming userData contains your token information
        if (userData.token) {
            // Store the token in localStorage
            localStorage.setItem('token', userData.token);

            // Optional: Store the refresh token if it's part of your login response
            if (userData.refreshToken) {
                localStorage.setItem('refreshToken', userData.refreshToken);
            }

            // Log the token setup for debugging
            console.log('Token set in localStorage:', localStorage.getItem('token'));
        } else {
            console.error('No token in userData', userData);
            return; // Early return if no token, to prevent further execution
        }

        // Now fetch user details by email
        usersService.getUserByEmail(email)
            .then(response => {
                // Dispatch login action with user data
                dispatch(loginUser(response.data));
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });
    };



    const handleLogOut = () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch(logoutUser());
        }
        catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <div className={className}>
            {user ?
                <LogOutButton onClick={handleLogOut} /> :
                <LogInButton onSuccessfulLogin={handleSuccessfulLogin} />
            }
        </div>
    );
};

export default AuthenticationControl;