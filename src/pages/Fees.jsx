import { useAuth } from '../context/AuthContext';

const Fees = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const feeData = {
    total: 50000,
    paid: 35000,
    due: 15000,
    deadline: '2026-05-01'
  };

  const progress = (feeData.paid / feeData.total) * 100;

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Fee Management</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Administer and track institutional fee payments</p>
      </div>

      {!isAdmin ? (
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>My Fee Details</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>Student Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Total Fee</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Paid</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Due</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{user?.name || 'Student'}</td>
                <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>${feeData.total.toLocaleString()}</td>
                <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>${feeData.paid.toLocaleString()}</td>
                <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>${feeData.due.toLocaleString()}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <span className={`badge ${feeData.due === 0 ? 'badge-success' : 'badge-danger'}`}>
                    {feeData.due === 0 ? 'Paid' : 'Due'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Student Payment Status</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>Student Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>ID/Roll No</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Total Fee</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Paid</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'right', color: 'var(--text-secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[{n: 'Alice Smith', r: 'CS201', t: 50000, p: 50000}, {n: 'Bob Jones', r: 'ME204', t: 50000, p: 20000}, {n: 'Charlie Day', r: 'CE112', t: 50000, p: 0}].map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{s.n}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{s.r}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>${s.t.toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-primary)' }}>${s.p.toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <span className={`badge ${s.p === s.t ? 'badge-success' : s.p > 0 ? 'badge-warning' : 'badge-danger'}`}>
                      {s.p === s.t ? 'Cleared' : s.p > 0 ? 'Partial' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fees;
