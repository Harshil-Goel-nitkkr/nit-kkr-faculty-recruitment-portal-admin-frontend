// src/components/common/Alert.jsx
import React from 'react';
import './common.css';

const Alert = ({ type = 'info', message }) => {
  if (!message) return null;
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
