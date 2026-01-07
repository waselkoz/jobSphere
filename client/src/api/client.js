import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5001/api'
});

// Add auth token to requests if available
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default client;
