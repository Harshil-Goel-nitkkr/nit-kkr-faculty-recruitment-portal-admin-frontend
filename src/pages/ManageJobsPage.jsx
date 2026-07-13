// src/pages/ManageJobsPage.jsx
import React, { useEffect, useState } from 'react';
import { listAllJobsForAdmin, updateJob, deleteJob } from '../api/job.api';
import AdminJobCard from '../components/jobs/AdminJobCard.jsx';
import Button from '../components/common/Button.jsx';
import Modal from '../components/common/Modal.jsx';
import InputField from '../components/common/InputField.jsx';
import Alert from '../components/common/Alert.jsx';
import Spinner from '../components/common/Spinner.jsx';

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await listAllJobsForAdmin();
      setJobs(res.data.jobs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openEdit = (job) => {
    setEditingJob(job);
    setEditForm({
      ...job,
      lastDateToApply: job.lastDateToApply ? job.lastDateToApply.slice(0, 10) : '',
    });
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateJob(editingJob._id, editForm);
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (job) => {
    try {
      await updateJob(job._id, { isActive: !job.isActive });
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job status');
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Remove job "${job.title}" permanently?`)) return;
    try {
      await deleteJob(job._id);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Update Existing Job Openings</h2>
      <Alert type="error" message={error} />
      <div className="admin-job-grid">
        {jobs.map((job) => (
          <AdminJobCard key={job._id} job={job}>
            <Button variant="outline" onClick={() => openEdit(job)}>Edit</Button>
            <Button variant="secondary" onClick={() => handleToggleActive(job)}>
              {job.isActive ? 'Deactivate' : 'Activate'}
            </Button>
            <Button variant="danger" onClick={() => handleDelete(job)}>Remove</Button>
          </AdminJobCard>
        ))}
        {jobs.length === 0 && <p>No jobs posted yet.</p>}
      </div>

      {editingJob && (
        <Modal title={`Edit Job - ${editingJob.jobId}`} onClose={() => setEditingJob(null)}>
          <form onSubmit={handleSaveEdit}>
            <InputField label="Job Title" name="title" value={editForm.title} onChange={handleEditChange} required />
            <InputField label="Department" name="department" value={editForm.department} onChange={handleEditChange} required />
            <InputField label="Requirements" name="requirements" as="textarea" value={editForm.requirements} onChange={handleEditChange} />
            <InputField label="Eligibility" name="eligibility" as="textarea" value={editForm.eligibility} onChange={handleEditChange} />
            <InputField label="Minimum Requirements" name="minimumRequirements" as="textarea" value={editForm.minimumRequirements} onChange={handleEditChange} />
            <InputField label="Preferred Skills" name="preferredSkills" as="textarea" value={editForm.preferredSkills} onChange={handleEditChange} />
            <InputField label="Expected Salary" name="expectedSalary" value={editForm.expectedSalary} onChange={handleEditChange} />
            <InputField label="Benefits" name="benefits" as="textarea" value={editForm.benefits} onChange={handleEditChange} />
            <InputField label="Number of Openings" name="numberOfOpenings" type="number" value={editForm.numberOfOpenings} onChange={handleEditChange} />
            <InputField label="Application Fee (₹)" name="applicationFee" type="number" value={editForm.applicationFee} onChange={handleEditChange} />
            <InputField label="Last Date to Apply" name="lastDateToApply" type="date" value={editForm.lastDateToApply} onChange={handleEditChange} />
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ManageJobsPage;
