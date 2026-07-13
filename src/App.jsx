// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import DashboardHomePage from './pages/DashboardHomePage.jsx';
import AddJobPage from './pages/AddJobPage.jsx';
import ManageJobsPage from './pages/ManageJobsPage.jsx';
import ViewApplicationsPage from './pages/ViewApplicationsPage.jsx';
import JobApplicationsPage from './pages/JobApplicationsPage.jsx';
import VerifyDocumentsPage from './pages/VerifyDocumentsPage.jsx';
import AddAdminPage from './pages/AddAdminPage.jsx';

import AdminProtectedRoute from './components/common/AdminProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />

      <Route
        path="/"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<DashboardHomePage />} />
        <Route path="add-job" element={<AddJobPage />} />
        <Route path="manage-jobs" element={<ManageJobsPage />} />
        <Route path="applications" element={<ViewApplicationsPage />} />
        <Route path="applications/:jobId" element={<JobApplicationsPage />} />
        <Route path="verify-documents" element={<VerifyDocumentsPage />} />
        <Route path="add-admin" element={<AddAdminPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
