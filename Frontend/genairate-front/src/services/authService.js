import apiClient from './apiClient';

export const register = async (name, email, password) => {
  const res = await apiClient.post('/auth/register', {
    username: name,
    email,
    password,
  });
  return res.data; // contains { token, user }
};

export const login = async (email, password) => {
  const res = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return res.data;
};

export const getUserProfile = async () => {
  const res = await apiClient.get('/user/profile');
  return res.data;
};
