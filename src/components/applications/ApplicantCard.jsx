// src/components/applications/ApplicantCard.jsx
import React from 'react';
import StatusBadge from '../common/StatusBadge.jsx';
import Button from '../common/Button.jsx';
import './ApplicantCard.css';

const ApplicantCard = ({ application, onViewDetails }) => (
  <div className="applicant-card">
    <div className="applicant-card-info">
      <h4>
        {application.firstName} {application.lastName}
      </h4>
      <p className="applicant-meta">{application.email} &middot; {application.phoneNo}</p>
      <p className="applicant-meta">
        Applied: {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : '—'}
      </p>
    </div>
    <div className="applicant-card-status">
      <StatusBadge status={application.status} />
      <Button variant="outline" onClick={() => onViewDetails(application)}>
        Manage
      </Button>
    </div>
  </div>
);

export default ApplicantCard;
