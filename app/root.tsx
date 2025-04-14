import React from 'react';
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
  return (
    <AuthProvider>
      <Outlet />
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
