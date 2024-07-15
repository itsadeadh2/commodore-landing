import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL as string || 'https://api.itsadeadh2.com',
  timeout: 7000, // Timeout after 7 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken'); // Retrieve the CSRF token from cookies
  if (csrfToken) {
    config.headers['X-CSRFTOKEN'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
