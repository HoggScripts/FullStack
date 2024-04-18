import axios from 'axios';

const API_URL = 'http://localhost:5086/api/books';

const getAllBooks = () => {
    return axios.get(API_URL);
};

const getBookById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createBook = (newBook) => {
    return axios.post(API_URL, newBook);
};

const updateBook = (id, updatedBook) => {
    return axios.put(`${API_URL}/${id}`, updatedBook);
};

const deleteBook = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
const incrementReviewCount = (id) => {
    return axios.patch(`${API_URL}/${id}/incrementReviewCount`);
};

export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    incrementReviewCount
};