import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllClasses } from '../services/firestoreService';

const Classes = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getAllClasses();
      setClasses(data);
      setLoading(false);
    };
    fetchClasses();
  }, []);

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Academic Classes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Overview of all available curriculum modules</p>
        </div>
        {isAdmin && <button className="btn btn-primary">+ Create Class</button>}
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading classes...</p>
        </div>
      ) : classes.length === 0 ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No classes available.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {classes.map(c => (
            <div key={c.id} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--text-primary)' }}>{c.name}</h3>
                <span className="badge badge-warning">{c.code}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {c.description}
              </p>
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
