import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Building2, CalendarDays, Users, IndianRupee, MessageSquareWarning, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const role = user?.role || 'student'; 

  const getNavItems = () => {
    const common = [
      { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { path: '/timetable', icon: <CalendarDays size={20} />, label: 'Timetable' },
      { path: '/contacts', icon: <Users size={20} />, label: 'Directory' },
      { path: '/complaints', icon: <MessageSquareWarning size={20} />, label: 'Complaints' }
    ];

    if (role === 'student' || role === 'admin') {
      common.splice(1, 0, { path: '/hostel', icon: <Building2 size={20} />, label: 'Hostel' });
    }
    
    if (role === 'student') {
      common.splice(4, 0, { path: '/fees', icon: <IndianRupee size={20} />, label: 'Fees' });
    } else if (role === 'admin') {
      common.splice(4, 0, { path: '/fees', icon: <IndianRupee size={20} />, label: 'Fee Mgmt' });
    }

    return common;
  };

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Building2 size={24} color="var(--accent-primary)" />
        </div>
        <h2>Campus<span>Hub</span></h2>
      </div>

      <nav className="sidebar-nav">
        {getNavItems().map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/login" onClick={logout} className="nav-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
