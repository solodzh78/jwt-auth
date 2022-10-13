import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

api.interceptors.request.use((config) => {
    if (config?.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return config;
});

api.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            try {
                const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true});
                localStorage.setItem('accessToken',response.data.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                console.log('ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОВАН');
            }
        } else throw error
    }
)

export default api;