// src/api/axiosInstance.ts
import axios from 'axios';
import debouncer from './interceptors/debouncer';
import refresher from './interceptors/refresher';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const TIMEOUT = 5000;

console.log("BASE_URL: ", BASE_URL);

export const debounce = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
});

debounce.interceptors.request.use(debouncer);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(debouncer);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => response, refresher);

export default axiosInstance;
