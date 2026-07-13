// src/components/jobs/AdminJobCard.jsx
import React from 'react';
import StatusBadge from '../common/StatusBadge.jsx';
import './AdminJobCard.css';

const AdminJobCard = ({ job, children }) => {
  const isExpired = new Date(job.lastDateToApply) < new Date();
  return (
    <div className="admin-job-card">
      <div className="admin-job-card-top">
        <span className="admin-job-id">{job.jobId}</span>
        {!job.isActive ? (
          <StatusBadge status="REJECTED" />
        ) : isExpired ? (
          <span className="admin-job-expired">Deadline Passed</span>
        ) : (
          <span className="admin-job-open">Open</span>
        )}
      </div>
      <h3>{job.title}</h3>
      <p className="admin-job-meta">
        {job.department} &middot; {job.minimumDegree} &middot; {job.numberOfOpenings} opening(s)
      </p>
      <p className="admin-job-requirements">{job.requirements}</p>
      <p className="admin-job-deadline">
        Last date to apply: {new Date(job.lastDateToApply).toLocaleDateString()}
      </p>
      <div className="admin-job-card-actions">{children}</div>
    </div>
  );
};

export default AdminJobCard;
