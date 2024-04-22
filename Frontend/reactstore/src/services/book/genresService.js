import axios from 'axios';

const API_URL = 'http://localhost:5086/api/genres';

const getAllGenres = () => {
    return axios.get(API_URL);
};

const getGenreById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createGenre = (newGenre) => {
    return axios.post(API_URL, newGenre);
};

const updateGenre = (id, updatedGenre) => {
    return axios.put(`${API_URL}/${id}`, updatedGenre);
};

const deleteGenre = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
};