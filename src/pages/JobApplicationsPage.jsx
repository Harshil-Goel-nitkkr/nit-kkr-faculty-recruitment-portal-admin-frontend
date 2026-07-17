// src/pages/JobApplicationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../api/job.api';
import {
  getApplicationsForJob,
  updateApplicationStatus,
  scheduleInterview,
  issueOfferLetter,
} from '../api/application.api';
import ApplicantCard from '../components/applications/ApplicantCard.jsx';
import Modal from '../components/common/Modal.jsx';
import Button from '../components/common/Button.jsx';
import InputField from '../components/common/InputField.jsx';
import StatusBadge from '../components/common/StatusBadge.jsx';
import Alert from '../components/common/Alert.jsx';
import Spinner from '../components/common/Spinner.jsx';

const STATUS_OPTIONS = ['UNDER_REVIEW', 'SHORTLISTED_FOR_INTERVIEW', 'SELECTED', 'REJECTED'];

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  // status update form
  const [statusForm, setStatusForm] = useState({ status: '', note: '' });
  // interview form
  const [interviewForm, setInterviewForm] = useState({ date: '', time: '', mode: 'ONLINE', details: '', link: '', venue: '' });
  // offer letter file
  const [offerFile, setOfferFile] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobRes, appsRes] = await Promise.all([getJobById(jobId), getApplicationsForJob(jobId)]);
      setJob(jobRes.data.job);
      setApplications(appsRes.data.applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const openManage = (application) => {
    setSelected(application);
    setStatusForm({ status: application.status, note: '' });
    setInterviewForm({
      date: application.interview?.date ? application.interview.date.slice(0, 10) : '',
      time: application.interview?.time || '',
      mode: application.interview?.mode || 'ONLINE',
      details: application.interview?.details || '',
      link: application.interview?.link || '',
      venue: application.interview?.venue || '',
    });
    setOfferFile(null);
  };

  const closeManage = () => {
    setSelected(null);
    fetchData();
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await updateApplicationStatus(selected._id, statusForm);
      closeManage();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await scheduleInterview(selected._id, interviewForm);
      closeManage();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to schedule interview');
    } finally {
      setActionLoading(false);
    }
  };

  const handleIssueOffer = async (e) => {
    e.preventDefault();
    if (!offerFile) return setError('Please select the offer letter file first');
    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('offerLetter', offerFile);
      await issueOfferLetter(selected._id, formData);
      closeManage();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue offer letter');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <Link to="/applications">&larr; Back to Jobs</Link>
      <h2>{job?.title} ({job?.jobId})</h2>
      <Alert type="error" message={error} />

      {applications.map((application) => (
        <ApplicantCard key={application._id} application={application} onViewDetails={openManage} />
      ))}
      {applications.length === 0 && <p>No applications received yet for this job.</p>}

      {selected && (
        <Modal title={`Manage Application - ${selected.firstName} ${selected.lastName}`} onClose={closeManage}>
          <p><b>Email:</b> {selected.email}</p>
          <p><b>Phone:</b> {selected.phoneNo}</p>
          <p><b>Current Status:</b> <StatusBadge status={selected.status} /></p>
          <p>
            <b>Resume:</b>{' '}
            {selected.resumeUrl ? (
              <a href={selected.resumeUrl} target="_blank" rel="noreferrer">View Resume</a>
            ) : 'Not uploaded'}
          </p>

          <hr />
          <h4>Update Status</h4>
          <form onSubmit={handleStatusUpdate}>
            <div className="input-field">
              <label>Status</label>
              <select
                value={statusForm.status}
                onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <InputField
              label="Note (optional, included in email to candidate)"
              name="note"
              as="textarea"
              value={statusForm.note}
              onChange={(e) => setStatusForm({ ...statusForm, note: e.target.value })}
            />
            <Button type="submit" disabled={actionLoading}>Update Status</Button>
          </form>

          <hr />
          <h4>Schedule Interview / Test</h4>
          <form onSubmit={handleScheduleInterview}>
            <div className="form-row">
              <InputField label="Date" name="date" type="date" value={interviewForm.date} onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })} />
              <InputField label="Time" name="time" type="time" value={interviewForm.time} onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })} />
            </div>
            <div className="input-field">
              <label>Mode</label>
              <select value={interviewForm.mode} onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value })}>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </div>
            {interviewForm.mode === 'ONLINE' ? (
              <InputField label="Meeting Link" name="link" value={interviewForm.link} onChange={(e) => setInterviewForm({ ...interviewForm, link: e.target.value })} />
            ) : (
              <InputField label="Venue" name="venue" value={interviewForm.venue} onChange={(e) => setInterviewForm({ ...interviewForm, venue: e.target.value })} />
            )}
            <InputField label="Other Details" name="details" as="textarea" value={interviewForm.details} onChange={(e) => setInterviewForm({ ...interviewForm, details: e.target.value })} />
            <Button type="submit" disabled={actionLoading}>Schedule</Button>
          </form>

          <hr />
          <h4>Issue Offer Letter</h4>
          <form onSubmit={handleIssueOffer}>
            <div className="input-field">
              <label>Upload Offer Letter (PDF)</label>
              <input type="file" accept=".pdf" onChange={(e) => setOfferFile(e.target.files[0])} />
            </div>
            <Button type="submit" variant="secondary" disabled={actionLoading}>Issue Offer Letter</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default JobApplicationsPage;
