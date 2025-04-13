import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, googleSignIn, githubSignIn, twitterSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await githubSignIn();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with GitHub');
    } finally {
      setLoading(false);
    }
  };

  const handleTwitterSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await twitterSignIn();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with X');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn primary-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <Link to="/forgot-password" className="auth-link" style={{ alignSelf: 'flex-end', fontSize: '0.9rem' }}>
            Forgot Password?
          </Link>
        </form>
        
        <div className="social-divider">
          <span>or continue with</span>
        </div>
        
        <div className="social-login">
          <button
            type="button"
            className="social-btn google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <FaGoogle /> Continue with Google
          </button>
          
          <button
            type="button"
            className="social-btn github-btn"
            onClick={handleGithubSignIn}
            disabled={loading}
          >
            <FaGithub /> Continue with GitHub
          </button>
          
          <button
            type="button"
            className="social-btn twitter-btn"
            onClick={handleTwitterSignIn}
            disabled={loading}
          >
            <FaTwitter /> Continue with X
          </button>
        </div>
        
        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 