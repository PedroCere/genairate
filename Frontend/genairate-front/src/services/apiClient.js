import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserProfile = () => apiClient.get('/user/profile').then(res => res.data);
export const updateUserProfile = (profile) => apiClient.put('/user/profile', profile).then(res => res.data);

export const getUserPreferences = () => apiClient.get('/user/preferences').then(res => res.data);
export const updateUserPreferences = (prefs) => apiClient.put('/user/preferences', prefs).then(res => res.data);

export default apiClient;
