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

export default {
    register,
    verifyEmail,
    login,
    logout
};