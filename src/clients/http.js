// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env['REACT_APP_API_URL'],
  timeout: 7000, // Timeout after 1 second
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default axiosInstance;