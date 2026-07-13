// src/pages/ViewApplicationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listAllJobsForAdmin } from '../api/job.api';
import AdminJobCard from '../components/jobs/AdminJobCard.jsx';
import Button from '../components/common/Button.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Alert from '../components/common/Alert.jsx';

const ViewApplicationsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await listAllJobsForAdmin();
        setJobs(res.data.jobs);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>View Applications</h2>
      <p style={{ color: 'var(--text-muted)' }}>Select a job to view all candidate applications for it.</p>
      <Alert type="error" message={error} />
      <div className="admin-job-grid">
        {jobs.map((job) => (
          <AdminJobCard key={job._id} job={job}>
            <Button onClick={() => navigate(`/applications/${job._id}`)}>View Applications</Button>
          </AdminJobCard>
        ))}
        {jobs.length === 0 && <p>No jobs posted yet.</p>}
      </div>
    </div>
  );
};

export default ViewApplicationsPage;
