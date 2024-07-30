// src/api/interceptors/refresher.ts
import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const refresher = async (error: AxiosError) => {

  console.log("Using refresher interceptor...", error);

  const originalRequest = error.config;

  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshResponse = await axios.get(`${BASE_URL}/api/refresh`, {
        withCredentials: true,
      });

      if (refreshResponse.status === 200) {
        const { accessToken } = refreshResponse.data;
        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        console.log("Retrying original request...")
        return axios(originalRequest);
      } else {
        console.log("refreshResponse no bueno, logging out...")
        logout();
      }
    } catch (refreshError) {
      console.log("Error refreshing: ", refreshError)
      logout();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
}

export default refresher;
