import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import { loginUser, logoutUser } from "../../../context/users/UserAction";
import usersService from "../../../services/user/usersService";
import { logTokenExpirationTime } from "../../../Utility/tokenUtils";

const AuthenticationControl = ({ className }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSuccessfulLogin = (userData, email) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            logTokenExpirationTime(userData.token); 

            if (userData.refreshToken) {
                localStorage.setItem('refreshToken', userData.refreshToken);
            }
            console.log('Token set in localStorage:', localStorage.getItem('token'));
        } else {
            console.error('No token in userData', userData);
            return;
        }

        usersService.getUserByEmail(email)
            .then(response => {
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
        } catch (error) {
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
