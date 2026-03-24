import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Hostel = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [rooms] = useState([
    { id: 'A-101', capacity: 2, occupants: 2, status: 'Occupied' },
    { id: 'A-102', capacity: 2, occupants: 1, status: 'Available' },
    { id: 'B-201', capacity: 3, occupants: 0, status: 'Vacant' },
    { id: 'B-205', capacity: 1, occupants: 0, status: 'Maintenance' },
  ]);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Available': return 'badge-success';
      case 'Occupied': return 'badge-warning';
      case 'Vacant': return 'badge-info';
      case 'Maintenance': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Hostel Facility</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage accommodation and view room allocations</p>
        </div>
        {!isAdmin && <button className="btn btn-primary">Apply for Room</button>}
      </div>

      {!isAdmin ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Application Status</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
              <span style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>Applied</span>
            </div>
            <div style={{ height: 2, width: 60, background: 'var(--accent-success)', marginTop: 20 }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>...</div>
              <span style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>Under Review</span>
            </div>
            <div style={{ height: 2, width: 60, background: 'var(--glass-border)', marginTop: 20 }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>?</div>
              <span style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Allocated</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {rooms.map(room => (
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
                <div style={{ width: `${(room.occupants / room.capacity) * 100}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s' }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hostel;
