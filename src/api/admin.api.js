// src/api/admin.api.js
import axiosClient from './axiosClient';

export const adminLogin = (data) => axiosClient.post('/admin/login', data);
export const getDashboardStats = () => axiosClient.get('/admin/dashboard-stats');
export const addAdmin = (data) => axiosClient.post('/admin/add-admin', data);
