// src/pages/DashboardHomePage.jsx
import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api/admin.api';
import StatCard from '../components/common/StatCard.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Alert from '../components/common/Alert.jsx';

const DashboardHomePage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.stats);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <Alert type="error" message={error} />
      {stats && (
        <div className="stat-grid">
          <StatCard label="Total Registered Users" value={stats.totalUsers} />
          <StatCard label="Currently Open Job Applications" value={stats.openJobs} />
          <StatCard label="Jobs with Deadline Completed" value={stats.expiredJobs} />
          <StatCard label="Unprocessed Applications" value={stats.unprocessedApplications} />
          <StatCard label="Applications Under Progress" value={stats.applicationsUnderProgress} />
          <StatCard label="Interviews/Tests Scheduled" value={stats.interviewsScheduled} />
          <StatCard label="Candidates Selected" value={stats.selected} />
          <StatCard label="Applications Rejected" value={stats.rejected} />
        </div>
      )}
    </div>
  );
};

export default DashboardHomePage;
