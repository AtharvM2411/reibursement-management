import api from './api';

const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  signup: (userData) => {
    return api.post('/auth/signup', userData);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },
};

export default authService;
