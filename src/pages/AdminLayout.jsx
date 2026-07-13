// src/pages/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/dashboard/AdminHeader.jsx';
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminHeader onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div className="admin-layout-body">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="admin-layout-content container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
