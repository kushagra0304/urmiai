import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#1C1A1C',
      color: '#C2C2C2',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Logo */}
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '1.5rem',
          color: '#FF335F'
        }}>
          Urmi.ai
        </div>
        
        {/* Login Button */}
        <Link 
          to="/login"
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#FF335F',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Login
        </Link>
      </nav>
      
      {/* Main Content Area - Blank for now */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Intentionally left blank */}
      </div>
    </div>
  );
} 