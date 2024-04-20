import axios from 'axios';

const API_URL = 'http://localhost:5086/api/account';

const register = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

const verifyEmail = (userId, token) => {
    return axios.get(`${API_URL}/verify-email`, { params: { userId, token } });
};

const login = (user) => {
    return axios.post(`${API_URL}/login`, user);
};

const logout = () => {
    return axios.post(`${API_URL}/logout`);
};

const refreshToken = (token) => {
    return axios.post(`${API_URL}/refresh-token`, { token });
};

const handleRefreshToken = async (refreshToken) => {
    try {
        const response = await refreshToken(refreshToken);
        if (response.status === 200) {
          
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {

            console.log('Refresh token is expired or invalid. Please log in again.');

        } else {
          
            console.log('An error occurred while refreshing the token:', error);
        }
    }
};

export default {
    register,
    verifyEmail,
    login,
    logout,
    refreshToken,
    handleRefreshToken
};