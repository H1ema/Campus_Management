import { useState } from 'react';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'];
  
  const [schedule] = useState({
    'Monday-09:00 AM': { course: 'CS101', type: 'Lecture', location: 'Room 302' },
    'Monday-11:00 AM': { course: 'CS102', type: 'Lab', location: 'Lab 1' },
    'Tuesday-10:00 AM': { course: 'MA201', type: 'Lecture', location: 'Room 405' },
    'Wednesday-01:00 PM': { course: 'PH101', type: 'Tutorial', location: 'Room 201' },
    'Thursday-09:00 AM': { course: 'CS101', type: 'Lecture', location: 'Room 302' },
  });

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Weekly Timetable</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Your academic schedule for the current semester</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>Time</th>
              {days.map(day => (
                <th key={day} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-primary)' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, i) => (
              <tr key={time} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', color: 'var(--accent-primary)', fontWeight: '600' }}>{time}</td>
                {days.map(day => {
                  const entry = schedule[`${day}-${time}`];
                  return (
                    <td key={`${day}-${time}`} style={{ padding: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                      {entry ? (
                        <div style={{ padding: '0.75rem', background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{entry.course}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>{entry.type}</div>
                          <div className="badge badge-info" style={{ fontSize: '0.7rem' }}>{entry.location}</div>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--glass-border)', padding: '1rem' }}>-</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
