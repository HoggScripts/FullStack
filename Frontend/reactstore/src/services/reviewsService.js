import axios from 'axios';

const API_URL = 'http://localhost:5086/api/reviews';

const getAllReviews = () => {
    return axios.get(API_URL);
};

const getReviewById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createReview = (newReview) => {
    return axios.post(API_URL, newReview);
};

const updateReview = (id, updatedReview) => {
    return axios.put(`${API_URL}/${id}`, updatedReview);
};

const deleteReview = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getReviewsByBookId = (bookId) => {
    return axios.get(`${API_URL}/ByBook/${bookId}`);
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByBookId
};