import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        // Attempt to fetch specific dashboard details if backend supports it
        // Depending on role, the endpoint could vary, but for now we simulate or use a general one.
        // Assuming there isn't a specific dashboard route unless provided, using some base data.
        setStats({
          students: '1,245',
          courses: '34',
          attendance: '92%',
          activeComplaints: '5'
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardDetails();
  }, []);

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Welcome, {user?.name || 'Student'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Here is your overview for today. Role: <span className="badge badge-info">{user?.role || 'Guest'}</span>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Students</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-primary)' }}>{loading ? '...' : stats?.students}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Courses</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>{loading ? '...' : stats?.courses}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Avg. Attendance</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-success)' }}>{loading ? '...' : stats?.attendance}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pending Complaints</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-warning)' }}>{loading ? '...' : stats?.activeComplaints}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Recent Activity</h2>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading activity...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>System Update</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Routine maintenance and backend sync completed successfully.</p>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>2 hours ago</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
