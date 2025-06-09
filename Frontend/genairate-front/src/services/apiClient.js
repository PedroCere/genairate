import axios from 'axios';

const userServiceClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const blogContentClient = axios.create({
  baseURL: import.meta.env.VITE_BLOG_CONTENT_URL || 'http://localhost:8080/content',
  headers: {
    'Content-Type': 'application/json',
  },
});

const templateServiceClient = axios.create({
  baseURL: import.meta.env.VITE_BLOG_CONTENT_URL || 'http://localhost:8082/',
  headers: {
    'Content-Type': 'application/json',
  },
});


userServiceClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

blogContentClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserProfile = () => userServiceClient.get('/user/profile').then(res => res.data);
export const updateUserProfile = (profile) => userServiceClient.put('/user/profile', profile).then(res => res.data);

export const getUserPreferences = () => userServiceClient.get('/user/preferences').then(res => res.data);
export const updateUserPreferences = (prefs) => userServiceClient.put('/user/preferences', prefs).then(res => res.data);

export { userServiceClient, blogContentClient, templateServiceClient };

export default userServiceClient;


