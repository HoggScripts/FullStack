import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import { loginUser, logoutUser } from '../UserAction';
import usersService from '../../services/usersService';

const AuthenticationControl = ({ className }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSuccessfulLogin = (userData, email) => {
        usersService.getUserByEmail(email)
            .then(response => {
                dispatch(loginUser(response.data));
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });
    };

    const handleLogOut = () => {
        dispatch(logoutUser());
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