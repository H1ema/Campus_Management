import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Complaints = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [complaints, setComplaints] = useState([
    { id: 'C-001', subject: 'Wi-Fi Issue in Hostel A', status: 'Review', date: '2026-03-21' },
    { id: 'C-002', subject: 'Library working hours', status: 'Resolved', date: '2026-03-19' },
    { id: 'C-003', subject: 'Water supply disruption', status: 'Submitted', date: '2026-03-23' },
  ]);

  const getStatusBadge = (status) => {
    const map = {
      'Submitted': 'badge-info',
      'Review': 'badge-warning',
      'Resolved': 'badge-success',
      'Closed': 'badge-secondary'
    };
    return map[status] || 'badge-secondary';
  };

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Complaints & Feedback</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Report non-academic issues or view institutional grievances</p>
        </div>
        {!isAdmin && <button className="btn btn-primary">+ New Complaint</button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isAdmin ? '1fr' : '1fr 1fr', gap: '2rem' }}>
        
        {!isAdmin && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Submit a Complaint</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                <select className="input-field" style={{ appearance: 'none', backgroundColor: 'rgba(18,18,18,0.6)' }}>
                  <option>Hostel / Accommodation</option>
                  <option>Facilities / Maintenance</option>
                  <option>Academic Staff</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
                <textarea className="input-field" rows="4" placeholder="Describe your issue in detail..."></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Submit Ticket</button>
            </form>
          </div>
        )}

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {isAdmin ? 'All Active Complaints' : 'Your Previous Tickets'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {complaints.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', transition: 'background 0.2s' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'monospace' }}>{c.id}</span>
                    <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{c.subject}</h4>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Filed on {c.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`badge ${getStatusBadge(c.status)}`}>{c.status}</span>
                  {isAdmin && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Update</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Complaints;
