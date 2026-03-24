import { useState } from 'react';

const Contacts = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const contacts = [
    { id: 1, name: 'Ram Mohan', role: 'Professor', department: 'Computer Science', email: 'alan@campus.edu', phone: '+1 234 567 8900' },
    { id: 2, name: 'Vidhya', role: 'Head of Dept', department: 'Mathematics', email: 'ada@campus.edu', phone: '+1 234 567 8901' },
    { id: 3, name: 'Joseph', role: 'Administrator', department: 'Administration', email: 'grace@campus.edu', phone: '+1 234 567 8902' },
    { id: 4, name: 'Ramya', role: 'Professor', department: 'Physics', email: 'john@campus.edu', phone: '+1 234 567 8903' },
  ];

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.department.toLowerCase().includes(search.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Faculty') return matchesSearch && c.role.includes('Professor') || c.role.includes('Head');
    if (filter === 'Admin') return matchesSearch && c.role === 'Administrator';
    return matchesSearch;
  });

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Directory</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Find faculty and administration contacts</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '8px' }}>
            {['All', 'Faculty', 'Admin'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.5rem 1rem', background: filter === f ? 'var(--accent-primary)' : 'transparent', color: filter === f ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="input-field"
            placeholder="Search name or dept..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '250px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredContacts.map(contact => (
          <div key={contact.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', flexShrink: 0 }}>
              {contact.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</h3>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{contact.role} • {contact.department}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>✉️ {contact.email}</span>
                <span>📞 {contact.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
