import axios from 'axios';
import accountsService from './accountsService';

const API_URL = 'http://localhost:5086/api/users';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.requiresAuth) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            console.log('Attempting to refresh token...');
            try {
                const response = await accountsService.refreshToken(refreshToken);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    console.log('Token refreshed successfully.');
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
    }
    return Promise.reject(error);
});

const getAllUsers = () => api.get('/', { requiresAuth: true });
const getUserById = (id) => api.get(`/${id}`, { requiresAuth: true });
const createUser = (newUser) => api.post('/', newUser, { requiresAuth: false });
const updateUser = (id, updatedUser) => api.put(`/${id}`, updatedUser, { requiresAuth: true });
const deleteUser = (id) => api.delete(`/${id}`, { requiresAuth: true });
const getUserByEmail = (email) => api.get(`/email/${email}`, { requiresAuth: true });

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};
