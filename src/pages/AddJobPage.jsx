// src/pages/AddJobPage.jsx
import React, { useState } from 'react';
import { createJob } from '../api/job.api';
import InputField from '../components/common/InputField.jsx';
import Button from '../components/common/Button.jsx';
import Alert from '../components/common/Alert.jsx';

const DEGREE_OPTIONS = ['BTech', 'MTech', 'PhD', 'MSc', 'MA', 'MCA', 'Other'];

const initialForm = {
  jobId: '',
  title: '',
  department: '',
  minimumDegree: 'PhD',
  experienceRequiredYears: 0,
  requirements: '',
  eligibility: '',
  minimumRequirements: '',
  preferredSkills: '',
  expectedSalary: '',
  benefits: '',
  numberOfOpenings: 1,
  lastDateToApply: '',
  applicationFee: 0,
};

const AddJobPage = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await createJob(form);
      setMessage('Job posted successfully');
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Job Opening</h2>
      <Alert type="success" message={message} />
      <Alert type="error" message={error} />
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 760 }}>
        <div className="form-row">
          <InputField label="Job ID" name="jobId" value={form.jobId} onChange={handleChange} required placeholder="e.g. NITKKR/2026/CSE/01" />
          <InputField label="Job Title" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <InputField label="Department" name="department" value={form.department} onChange={handleChange} required />
          <div className="input-field">
            <label>Minimum Degree Required *</label>
            <select name="minimumDegree" value={form.minimumDegree} onChange={handleChange} required>
              {DEGREE_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <InputField label="Experience Required (years)" name="experienceRequiredYears" type="number" value={form.experienceRequiredYears} onChange={handleChange} />
          <InputField label="Number of Openings" name="numberOfOpenings" type="number" value={form.numberOfOpenings} onChange={handleChange} required />
        </div>
        <InputField label="Requirements (short summary shown on job card)" name="requirements" as="textarea" value={form.requirements} onChange={handleChange} required />
        <InputField label="Eligibility" name="eligibility" as="textarea" value={form.eligibility} onChange={handleChange} required />
        <InputField label="Minimum Requirements" name="minimumRequirements" as="textarea" value={form.minimumRequirements} onChange={handleChange} required />
        <InputField label="Preferred Skills" name="preferredSkills" as="textarea" value={form.preferredSkills} onChange={handleChange} />
        <div className="form-row">
          <InputField label="Expected Salary" name="expectedSalary" value={form.expectedSalary} onChange={handleChange} />
          <InputField label="Application Fee (₹)" name="applicationFee" type="number" value={form.applicationFee} onChange={handleChange} />
        </div>
        <InputField label="Benefits" name="benefits" as="textarea" value={form.benefits} onChange={handleChange} />
        <InputField label="Last Date to Apply" name="lastDateToApply" type="date" value={form.lastDateToApply} onChange={handleChange} required />
        <Button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Job'}</Button>
      </form>
    </div>
  );
};

export default AddJobPage;
