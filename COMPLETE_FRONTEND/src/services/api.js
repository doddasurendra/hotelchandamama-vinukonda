import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu APIs
export const getMenuItems = (category = '') => {
  const url = category ? `/menu?category=${category}` : '/menu';
  return api.get(url);
};

// Order APIs
export const createOrder = (orderData) => {
  return api.post('/orders', orderData);
};

// Contact APIs
export const createContact = (contactData) => {
  return api.post('/contact', contactData);
};

// Gallery APIs
export const getGalleryImages = () => {
  return api.get('/gallery');
};

export default api;
