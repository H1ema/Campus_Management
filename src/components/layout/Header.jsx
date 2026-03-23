import { Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header glass-panel">
      <div className="header-left">
        <h1 className="page-title">Dashboard</h1>
      </div>
      
      <div className="header-right">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile">
          <UserCircle size={32} color="var(--accent-primary)" />
          <div className="user-info">
            <span className="user-name">{user?.name || 'Guest'}</span>
            <span className="user-role" style={{textTransform: 'capitalize'}}>{user?.role || 'Visitor'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
