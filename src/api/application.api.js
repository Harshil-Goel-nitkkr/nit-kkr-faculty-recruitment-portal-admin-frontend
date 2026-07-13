// src/api/application.api.js
import axiosClient from './axiosClient';

export const getApplicationsForJob = (jobId) => axiosClient.get(`/applications/admin/job/${jobId}`);

export const updateApplicationStatus = (applicationId, data) =>
  axiosClient.put(`/applications/admin/${applicationId}/status`, data);

export const scheduleInterview = (applicationId, data) =>
  axiosClient.put(`/applications/admin/${applicationId}/interview`, data);

export const issueOfferLetter = (applicationId, formData) =>
  axiosClient.post(`/applications/admin/${applicationId}/offer-letter`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getApplicationsWithDocuments = () => axiosClient.get('/applications/admin/documents/pending');

// status: 'VERIFIED' | 'REJECTED', rejectionReason: string
export const verifyDocument = (applicationId, documentId, status, rejectionReason) =>
  axiosClient.put(`/applications/admin/${applicationId}/documents/${documentId}/verify`, {
    status,
    rejectionReason,
  });
