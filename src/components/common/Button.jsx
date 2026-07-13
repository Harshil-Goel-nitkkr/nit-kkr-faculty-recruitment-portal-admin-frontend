// src/components/common/Button.jsx
import React from 'react';
import './common.css';

const Button = ({ children, variant = 'primary', type = 'button', onClick, disabled, fullWidth }) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}>
    {children}
  </button>
);

export default Button;
