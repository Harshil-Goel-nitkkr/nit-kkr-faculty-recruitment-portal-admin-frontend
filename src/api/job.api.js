// src/api/job.api.js
import axiosClient from './axiosClient';

export const listAllJobsForAdmin = () => axiosClient.get('/jobs/admin/all');
export const getJobById = (id) => axiosClient.get(`/jobs/${id}`);
export const createJob = (data) => axiosClient.post('/jobs', data);
export const updateJob = (id, data) => axiosClient.put(`/jobs/${id}`, data);
export const deleteJob = (id) => axiosClient.delete(`/jobs/${id}`);
