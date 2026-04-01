import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllFees, getStudentFee } from '../services/firestoreService';

const Fees = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [feeData, setFeeData] = useState(null);
  const [allFees, setAllFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }
    const load = async () => {
      try {
        if (isAdmin) {
          const data = await getAllFees();
          setAllFees(data || []);
        } else {
          const data = await getStudentFee(user.uid, user.name);
          setFeeData(data || null);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load fee data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Fee Management</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Administer and track institutional fee payments</p>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading fee data…</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--accent-danger, #f87171)' }}>{error}</p>
        </div>
      ) : !isAdmin ? (
        /* ── STUDENT VIEW ── */
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>My Fee Details</h2>
          {!feeData ? (
            <p style={{ color: 'var(--text-secondary)' }}>No fee record found for your account.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr>
                  {['Student Name', 'Total Fee', 'Paid', 'Due', 'Status'].map((h, i) => (
                    <th key={h} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: i === 0 ? 'left' : 'right', color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{feeData.studentName || user?.name || 'Student'}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>₹{(feeData.total || 0).toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>₹{(feeData.paid || 0).toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>₹{((feeData.total || 0) - (feeData.paid || 0)).toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <span className={`badge ${feeData.paid >= feeData.total ? 'badge-success' : 'badge-danger'}`}>
                      {feeData.paid >= feeData.total ? 'Paid' : 'Due'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ) : (
        /* ── ADMIN VIEW ── */
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Student Payment Status</h2>
          {allFees.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No fee records found in the database.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr>
                  {['Student Name', 'ID / Roll No', 'Total Fee', 'Paid', 'Status'].map((h, i) => (
                    <th key={h} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: i < 2 ? 'left' : 'right', color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFees.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{s.studentName}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{s.rollNo || s.id}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>₹{(s.total || 0).toLocaleString()}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>₹{(s.paid || 0).toLocaleString()}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <span className={`badge ${s.paid >= s.total ? 'badge-success' : s.paid > 0 ? 'badge-warning' : 'badge-danger'}`}>
                        {s.paid >= s.total ? 'Cleared' : s.paid > 0 ? 'Partial' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Fees;