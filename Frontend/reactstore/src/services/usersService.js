import axios from 'axios';

const API_URL = 'http://localhost:5086/api/users';

const getAllUsers = () => {
    return axios.get(API_URL);
};

const getUserById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createUser = (newUser) => {
    return axios.post(API_URL, newUser);
};

const updateUser = (id, updatedUser) => {
    return axios.put(`${API_URL}/${id}`, updatedUser);
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getUserByEmail = (email) => {
    return axios.get(`${API_URL}/email/${email}`);
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail // Add this line
};