import { templateServiceClient } from './apiClient';

const BASE = '/api/v1/templates';

export const getTemplatesByUser = async (userId) => {
  return templateServiceClient.get(`${BASE}/user/${userId}`).then(res => res.data);
};

export const getTemplateById = async (id) => {
  return templateServiceClient.get(`${BASE}/${id}`).then(res => res.data);
};

export const createTemplate = async (userId, data) => {
  return templateServiceClient.post(`${BASE}/${userId}`, data).then(res => res.data);
};

export const updateTemplate = async (id, userId, data) => {
  return templateServiceClient.put(`${BASE}/${id}/${userId}`, data).then(res => res.data);
};

export const deleteTemplate = async (id, userId) => {
  return templateServiceClient.delete(`${BASE}/${id}/${userId}`).then(res => res.data);
};
