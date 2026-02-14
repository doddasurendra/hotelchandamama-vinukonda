import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const getMe = () => {
  return api.get('/auth/me');
};

// Menu APIs
export const getMenuItems = (category = '') => {
  const url = category ? `/menu?category=${category}` : '/menu';
  return api.get(url);
};

export const createMenuItem = (formData) => {
  return api.post('/menu', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateMenuItem = (id, formData) => {
  return api.put(`/menu/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteMenuItem = (id) => {
  return api.delete(`/menu/${id}`);
};

export const autoGenerateMenu = () => {
  return api.post('/menu/auto-generate');
};

// Order APIs
export const getOrders = () => {
  return api.get('/orders');
};

export const updateOrderStatus = (id, status) => {
  return api.put(`/orders/${id}`, { status });
};

// Contact APIs
export const getContacts = (type = '') => {
  const url = type ? `/contact?type=${type}` : '/contact';
  return api.get(url);
};

export const deleteContact = (id) => {
  return api.delete(`/contact/${id}`);
};

// Gallery APIs
export const getGalleryImages = () => {
  return api.get('/gallery');
};

export const uploadGalleryImage = (formData) => {
  return api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteGalleryImage = (id) => {
  return api.delete(`/gallery/${id}`);
};

export default api;
