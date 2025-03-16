import api from './api';

export const authService = {
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
  
  refreshToken: (refreshToken) => {
    return api.post('/auth/refresh-token', { refreshToken });
  },
  
  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },
  
  resetPassword: (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
  },
  
  getProfile: () => {
    return api.get('/auth/profile');
  },
  
  updateProfile: (profileData) => {
    return api.put('/auth/profile', profileData);
  },
  
  changePassword: (passwordData) => {
    return api.post('/auth/change-password', passwordData);
  }
};

export default authService;