// plugins/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_API } from '@/utils/api-config';
import { toast } from 'vue3-toastify';

const axiosInstance = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Request error: ' + error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data?.message || 'An unknown error occurred.';
      if (status === 401) {
        toast.error('Unauthorized: ' + errorMessage);
        Cookies.remove('token');
        Cookies.remove('profile');
        // window.location.href = '/auth/login'; 
      } else if (status === 500) {
        toast.error('Server error: ' + errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } else if (error.request) {
      toast.error('No response from server. Please check your connection.');
    } else {
      toast.error('Error: ' + error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
