// src/pages/AddAdminPage.jsx
import React, { useState } from 'react';
import { addAdmin } from '../api/admin.api';
import InputField from '../components/common/InputField.jsx';
import Button from '../components/common/Button.jsx';
import Alert from '../components/common/Alert.jsx';
import './AddAdminPage.css';

const AddAdminPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'ADMIN' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      await addAdmin({ name: form.name, email: form.email, password: form.password, role: form.role });
      setSuccess('Admin added successfully');
      setForm({ name: '', email: '', password: '', confirmPassword: '', role: 'ADMIN' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-admin-page">
      <h2>Add Admin</h2>
      <form className="add-admin-form" onSubmit={handleSubmit}>
        <Alert type="error" message={error} />
        <Alert type="success" message={success} />
        <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <div className="form-row">
          <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          <InputField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        <div className="input-field">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Admin'}</Button>
      </form>
    </div>
  );
};

export default AddAdminPage;
