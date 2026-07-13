// src/components/common/Modal.jsx
import React from 'react';
import './common.css';

const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay">
    <div className="modal-box">
      <div className="modal-header">
        <h3>{title}</h3>
        <button className="modal-close" onClick={onClose}>&times;</button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </div>
);

export default Modal;
