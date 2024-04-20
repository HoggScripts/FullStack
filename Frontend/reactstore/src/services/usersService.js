import axios from 'axios';
import accountsService from './accountsService'; 

const API_URL = 'http://localhost:5086/api/users';


const api = axios.create({
    baseURL: API_URL
});


api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if (token && config.requiresAuth) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            const response = await accountsService.refreshToken(refreshToken);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                return api(originalRequest);
            }
        }
    }
    return Promise.reject(error);
});

const getAllUsers = () => {
    return api.get('/', { requiresAuth: true });
};

const getUserById = (id) => {
    return api.get(`/${id}`, { requiresAuth: true });
};

const createUser = (newUser) => {
    return api.post('/', newUser, { requiresAuth: false });
};

const updateUser = (id, updatedUser) => {
    return api.put(`/${id}`, updatedUser, { requiresAuth: true });
};

const deleteUser = (id) => {
    return api.delete(`/${id}`, { requiresAuth: true });
};

const getUserByEmail = (email) => {
    return api.get(`/email/${email}`, { requiresAuth: true });
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};