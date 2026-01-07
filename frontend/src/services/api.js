import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then((res) => {
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      return res.data;
    }),

  register: (email, password, name, role) =>
    api.post('/auth/register', { email, password, name, role }).then((res) => res.data),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Restaurants API
export const restaurantsAPI = {
  getAll: () => api.get('/restaurants').then((res) => res.data),
  getById: (id) => api.get(`/restaurants/${id}`).then((res) => res.data),
  create: (data) => api.post('/restaurants', data).then((res) => res.data),
  update: (id, data) => api.patch(`/restaurants/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/restaurants/${id}`).then((res) => res.data),
};

// Menu Items API
export const menuItemsAPI = {
  getAll: (restaurantId) => {
    const url = restaurantId
      ? `/menu-items?restaurantId=${restaurantId}`
      : '/menu-items';
    return api.get(url).then((res) => res.data);
  },
  getById: (id) => api.get(`/menu-items/${id}`).then((res) => res.data),
  create: (data) => api.post('/menu-items', data).then((res) => res.data),
  update: (id, data) => api.patch(`/menu-items/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/menu-items/${id}`).then((res) => res.data),
};

// Orders API
export const ordersAPI = {
  getAll: () => {
    // Backend determines customer from JWT token (admins see all, customers see their own)
    return api.get('/orders').then((res) => res.data);
  },
  getById: (id) => api.get(`/orders/${id}`).then((res) => res.data),
  create: (data) => api.post('/orders', data).then((res) => res.data),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, { status }).then((res) => res.data),
  delete: (id) => api.delete(`/orders/${id}`).then((res) => res.data),
};

export default api;
