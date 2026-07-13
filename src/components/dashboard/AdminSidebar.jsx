// src/components/dashboard/AdminSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import './dashboard.css';

const MENU_ITEMS = [
  { to: 'home', label: 'Dashboard Home' },
  { to: 'add-job', label: 'Add Job' },
  { to: 'manage-jobs', label: 'Update Existing Job Openings' },
  { to: 'applications', label: 'View Applications' },
  { to: 'verify-documents', label: 'Verify Documents' },
  { to: 'add-admin', label: 'Add Admin' },
];

const AdminSidebar = ({ open, onClose }) => {
  const { logoutAdmin, admin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  return (
    <aside className={`admin-sidebar ${open ? 'admin-sidebar-open' : ''}`}>
      <nav className="admin-sidebar-nav">
        {MENU_ITEMS.map((item) => {
          if (item.to === 'add-admin' && admin?.role !== 'SUPER_ADMIN') return null;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `admin-sidebar-link ${isActive ? 'admin-sidebar-link-active' : ''}`}
            >
              {item.label}
            </NavLink>
          );
        })}
        <button className="admin-sidebar-link admin-sidebar-logout" onClick={handleLogout}>Logout</button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
