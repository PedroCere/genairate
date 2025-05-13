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
  try {
    const res = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.message.includes('Network Error') || error.code === 'ECONNABORTED') {
      return {
        id: 'offline',
        name: 'Modo Offline',
        email: 'offline@genairate.com',
        token: null,
        offline: true,
      };
    }
    throw error;
  }
};

export const getUserProfile = async () => {
  const res = await apiClient.get('/user/profile');
  return res.data;
};
