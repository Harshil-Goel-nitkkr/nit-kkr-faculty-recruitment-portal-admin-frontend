// src/components/common/StatusBadge.jsx
import React from 'react';
import './common.css';

const STATUS_LABELS = {
  INCOMPLETE: 'Incomplete', FEE_PENDING: 'Fee Pending', SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review', SHORTLISTED_FOR_INTERVIEW: 'Shortlisted for Interview',
  SELECTED: 'Selected', REJECTED: 'Rejected', PENDING: 'Pending', VERIFIED: 'Verified',
};

const StatusBadge = ({ status }) => (
  <span className={`status-badge status-${status?.toLowerCase()}`}>{STATUS_LABELS[status] || status}</span>
);

export default StatusBadge;
