import axios from 'axios';

const baseURL = 'https://backed-bookis-production-c128.up.railway.app/api-docs';
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { instance  };

