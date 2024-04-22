import axios from 'axios';

const API_URL = 'http://localhost:5086/api/orders';

const getAllOrders = () => {
    return axios.get(API_URL);
};

const getOrderById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createOrder = (newOrder) => {
    return axios.post(API_URL, newOrder);
};

const updateOrder = (id, updatedOrder) => {
    return axios.put(`${API_URL}/${id}`, updatedOrder);
};

const deleteOrder = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getOrdersByUserId = (userId) => {
    return axios.get(`${API_URL}/User/${userId}`);
};

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
};