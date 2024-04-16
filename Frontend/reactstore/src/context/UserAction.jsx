// UserAction.jsx

// Action for logging in
export const loginUser = user => ({
    type: 'LOGIN_USER',
    payload: user
});

// Action for logging out
export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});