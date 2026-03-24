import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Students = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', roll_number: 'CS201', email: 'john@campus.edu' },
    { id: 2, name: 'Alice Smith', roll_number: 'EE104', email: 'alice@campus.edu' },
    { id: 3, name: 'Bob Jones', roll_number: 'ME204', email: 'bob@campus.edu' },
  ]);

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Students Directory</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage enrolled students</p>
        </div>
        {isAdmin && <button className="btn btn-primary">+ Add Student</button>}
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>Student Name</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>Roll Number</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>Email Address</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{s.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                  <span className="badge badge-info">{s.roll_number || 'N/A'}</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{s.email}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  {isAdmin ? (
                    <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Edit</button>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>-</span>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
