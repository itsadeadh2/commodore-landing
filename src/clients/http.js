// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://itsadeadh2.com/api', // Replace with your base URL
  timeout: 7000, // Timeout after 1 second
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;