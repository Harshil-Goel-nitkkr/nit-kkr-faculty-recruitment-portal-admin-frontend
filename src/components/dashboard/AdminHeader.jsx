// src/components/dashboard/AdminHeader.jsx
import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import './dashboard.css';

const AdminHeader = ({ onMenuToggle }) => {
  const { admin } = useAdminAuth();
  return (
    <header className="admin-header">
      <div className="container admin-header-inner">
        <button className="admin-menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">☰</button>
        <span className="admin-header-title">NIT Kurukshetra Recruitment Portal - Admin</span>
        {admin && <span className="admin-welcome">{admin.name} ({admin.role})</span>}
      </div>
    </header>
  );
};

export default AdminHeader;
