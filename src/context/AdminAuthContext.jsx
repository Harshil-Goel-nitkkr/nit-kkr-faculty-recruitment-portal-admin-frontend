import React, { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const s = localStorage.getItem('nitkkr_admin');
    return s ? JSON.parse(s) : null;
  });

  const loginAdmin = (token, adminData) => {
    localStorage.setItem('nitkkr_admin_token', token);
    localStorage.setItem('nitkkr_admin', JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('nitkkr_admin_token');
    localStorage.removeItem('nitkkr_admin');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
