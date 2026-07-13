// src/pages/VerifyDocumentsPage.jsx
import React, { useEffect, useState } from 'react';
import { getApplicationsWithDocuments, verifyDocument } from '../api/application.api';
import Spinner from '../components/common/Spinner.jsx';
import Alert from '../components/common/Alert.jsx';
import Button from '../components/common/Button.jsx';
import StatusBadge from '../components/common/StatusBadge.jsx';
import InputField from '../components/common/InputField.jsx';
import './VerifyDocumentsPage.css';

const API_FILE_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace('/api', '');

const VerifyDocumentsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionTarget, setActionTarget] = useState(null); // {applicationId, documentId}

  const load = async () => {
    setLoading(true);
    try {
      const res = await getApplicationsWithDocuments();
      setApplications(res.data.applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleVerify = async (applicationId, documentId, status) => {
    setError(''); setSuccess('');
    try {
      await verifyDocument(applicationId, documentId, status, status === 'REJECTED' ? rejectionReason : undefined);
      setSuccess(`Document ${status === 'VERIFIED' ? 'verified' : 'rejected'} successfully`);
      setActionTarget(null);
      setRejectionReason('');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="verify-docs-page">
      <h2>Verify Documents</h2>
      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      {applications.length === 0 && <p className="empty-msg">No applications with uploaded documents at this time.</p>}

      {applications.map((app) => (
        <div key={app._id} className="verify-app-block">
          <div className="verify-app-header">
            <div>
              <strong>{app.firstName} {app.lastName}</strong>
              <span className="verify-app-meta"> — {app.email} | {app.job?.title} ({app.job?.jobId})</span>
            </div>
            <StatusBadge status={app.status} />
          </div>

          <div className="verify-docs-list">
            {app.documents.map((doc) => (
              <div key={doc._id} className="verify-doc-row">
                <a href={`${API_FILE_BASE}${doc.fileUrl}`} target="_blank" rel="noreferrer" className="verify-doc-name">
                  📎 {doc.name}
                </a>
                <StatusBadge status={doc.verificationStatus} />

                {doc.verificationStatus === 'PENDING' && (
                  <div className="verify-doc-actions">
                    {actionTarget?.documentId === doc._id && actionTarget?.action === 'REJECTED' ? (
                      <div className="reject-form">
                        <InputField
                          label="Rejection Reason"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          required
                        />
                        <div className="reject-form-actions">
                          <Button variant="danger" onClick={() => handleVerify(app._id, doc._id, 'REJECTED')}>
                            Confirm Reject
                          </Button>
                          <Button variant="outline" onClick={() => setActionTarget(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Button onClick={() => handleVerify(app._id, doc._id, 'VERIFIED')}>
                          ✓ Verify
                        </Button>
                        <Button variant="danger" onClick={() => setActionTarget({ applicationId: app._id, documentId: doc._id, action: 'REJECTED' })}>
                          ✗ Reject
                        </Button>
                      </>
                    )}
                  </div>
                )}

                {doc.rejectionReason && (
                  <span className="rejection-note">Reason: {doc.rejectionReason}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerifyDocumentsPage;
