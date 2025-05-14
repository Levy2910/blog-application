import axios from 'axios';

const API_URL = 'http://localhost:8080/api/blogs'; // Update with your backend URL

const getAllBlogs = () => {
    return axios.get(API_URL);
};

export default {
    getAllBlogs,
};
