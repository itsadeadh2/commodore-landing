import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL as string || 'http://localhost:5000',
  timeout: 7000, // Timeout after 7 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrf_access_token'); // Retrieve the CSRF token from cookies
  console.log('DEBUGING: CSRF TOKEN (REMOVE THIS LATER)', csrfToken)
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
