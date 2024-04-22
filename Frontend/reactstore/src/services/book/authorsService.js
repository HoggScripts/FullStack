import axios from 'axios';

const API_URL = 'http://localhost:5086/api/authors';

const getAllAuthors = () => {
    return axios.get(API_URL);
};

const getAuthorById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createAuthor = (newAuthor) => {
    return axios.post(API_URL, newAuthor);
};

const updateAuthor = (id, updatedAuthor) => {
    return axios.put(`${API_URL}/${id}`, updatedAuthor);
};

const deleteAuthor = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
