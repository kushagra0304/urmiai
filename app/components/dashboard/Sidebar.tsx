import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ sidebarOpen, toggleSidebar }: SidebarProps) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <h1>URMI</h1>
        </div>
        <button className="sidebar-close" onClick={toggleSidebar}>×</button>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">ORGANIZATION</h3>
        <div className="sidebar-email">
          <span>{currentUser?.email || 'mail@gmail.com'}</span>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#FF335F',
              marginLeft: '5px' 
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <Link to="/dashboard" className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <span className="sidebar-icon">🏠</span>
            <span>Overview</span>
          </Link>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">BUILD</h3>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">👤</span>
            <span>Assistants</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">⚙️</span>
            <span>Workflows</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">📱</span>
            <span>Phone Numbers</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">🔧</span>
            <span>Tools</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">📁</span>
            <span>Files</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">👥</span>
            <span>Squads</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">🔑</span>
            <span>Provider Keys</span>
          </a>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">TEST</h3>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">OBSERVE</h3>
          <Link to="/call-logs" className={`sidebar-link ${isActive('/call-logs') ? 'active' : ''}`}>
            <span className="sidebar-icon">📞</span>
            <span>Call Logs</span>
          </Link>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">📊</span>
            <span>API Logs</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">🔔</span>
            <span>Webhook Logs</span>
          </a>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">COMMUNITY</h3>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">ORG SETTINGS</h3>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">ACCOUNT SETTINGS</h3>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <a href="#" className="sidebar-help">
          <span className="sidebar-icon">❓</span>
          <span>Help</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar; 