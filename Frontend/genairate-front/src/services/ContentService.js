import { blogContentClient } from './apiClient';

const BASE = '';

export const generateArticle = async (data) => blogContentClient.post(`${BASE}/generate`, data).then(r => r.data);
export const rewriteText = async (data) => blogContentClient.post(`${BASE}/rewrite`, data).then(r => r.data);
export const summarizeText = async (data) => blogContentClient.post(`${BASE}/summarize`, data).then(r => r.data);
export const correctText = async (data) => blogContentClient.post(`${BASE}/correct`, data).then(r => r.data);
export const translateText = async (data) => blogContentClient.post(`${BASE}/translate`, data).then(r => r.data);
export const saveArticle = async (data) => blogContentClient.post(`${BASE}/save`, data).then(r => r.data);
export const getById = async (id) => blogContentClient.get(`${BASE}/${id}`).then(r => r.data);
export const deleteArticle = async (id) => blogContentClient.delete(`${BASE}/${id}`).then(r => r.data);
export const getRecentArticles = async () => blogContentClient.get(`${BASE}/recent`).then(r => r.data);
export const getAllArticles = async () => blogContentClient.get(`${BASE}/all`).then(r => r.data);

// Implement saveDraft as alias to saveArticle for now
export const saveDraft = async (id, data) => saveArticle(data);

// Implement publishArticle assuming POST /content/publish/{id} endpoint
export const publishArticle = async (id) => blogContentClient.post(`${BASE}/publish/${id}`).then(r => r.data);
