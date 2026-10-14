import axios from "axios";

export const apiClient = axios.create({ baseURL: 'https://route-posts.routemisr.com/' });
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.token = `${token}`
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)