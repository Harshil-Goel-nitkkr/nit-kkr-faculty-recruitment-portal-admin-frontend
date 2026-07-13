// src/components/common/StatCard.jsx
import React from 'react';
import './common.css';

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

export default StatCard;
