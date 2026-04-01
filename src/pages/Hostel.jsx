import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllRooms, getStudentHostelApp, applyForRoom } from '../services/firestoreService';

const Hostel = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [rooms, setRooms] = useState([]);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        if (isAdmin) {
          const data = await getAllRooms();
          setRooms(data);
        } else {
          const app = await getStudentHostelApp(user?.id || user?.uid);
          setApplication(app);
        }
      } catch (err) {
        console.error('Failed to load hostel data', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAdmin, user]);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Available': return 'badge-success';
      case 'Occupied': return 'badge-warning';
      case 'Vacant': return 'badge-info';
      case 'Maintenance': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      await applyForRoom(user?.id || user?.uid, user?.name || 'Student');
      const app = await getStudentHostelApp(user?.id || user?.uid);
      setApplication(app);
    } catch (err) {
      console.error('Failed to apply for room', err);
    } finally {
      setApplying(false);
    }
  };

  const stepStyle = (active, done) => ({
    width: 40, height: 40, borderRadius: '50%',
    background: done ? 'var(--accent-success)' : active ? 'var(--accent-warning)' : 'rgba(255,255,255,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
    color: done || active ? '#fff' : 'var(--text-secondary)'
  });

  const statusSteps = ['Applied', 'Under Review', 'Allocated'];
  const currentStep = application
    ? application.status === 'Applied' ? 0
      : application.status === 'Under Review' ? 1
      : 2
    : -1;

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Hostel Facility</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage accommodation and view room allocations</p>
        </div>
        {!isAdmin && !application && !loading && (
          <button className="btn btn-primary" onClick={handleApply} disabled={applying}>
            {applying ? 'Applying…' : 'Apply for Room'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading…</p>
        </div>
      ) : !isAdmin ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Application Status</h2>
          {!application ? (
            <p style={{ color: 'var(--text-secondary)' }}>You have not applied for a hostel room yet.</p>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0', marginTop: '2rem' }}>
              {statusSteps.map((step, idx) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={stepStyle(idx === currentStep, idx < currentStep)}>
                      {idx < currentStep ? '✓' : idx === currentStep ? '…' : '?'}
                    </div>
                    <span style={{ marginTop: '0.5rem', color: idx <= currentStep ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '0.85rem' }}>{step}</span>
                  </div>
                  {idx < statusSteps.length - 1 && (
                    <div style={{ height: 2, width: 60, background: idx < currentStep ? 'var(--accent-success)' : 'var(--glass-border)', marginBottom: '1.5rem' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {rooms.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No rooms found in the database.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {rooms.map((room) => (
                <div key={room.id} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Room {room.id}</h3>
                    <span className={`badge ${getBadgeClass(room.status)}`}>{room.status}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    <p>Capacity: {room.capacity} beds</p>
                    <p>Occupants: {room.occupants}</p>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${room.capacity ? (room.occupants / room.capacity) * 100 : 0}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hostel;
