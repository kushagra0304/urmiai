import React, { useState, useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { AuthProvider } from "./context/AuthContext";

import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dashboard</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [appReady, setAppReady] = useState(false);

  // Add a safety timeout to make sure the app renders even if there's an issue
  useEffect(() => {
    // Set app to ready after a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {appReady ? <Outlet /> : (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#1C1A1C',
          color: '#C2C2C2'
        }}>
          <div className="loading-spinner" style={{ 
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid #FF335F',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          <p>Loading application...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
    </AuthProvider>
  );
}

// Simple error boundary
export function ErrorBoundary() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      backgroundColor: '#1C1A1C',
      color: '#C2C2C2',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ color: '#FF335F', marginBottom: '1rem' }}>Oops! Something went wrong</h1>
      <p>Please try refreshing the page</p>
      <button 
        onClick={() => window.location.href = '/login'}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#FF335F',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Go to Login
      </button>
    </div>
  );
}
