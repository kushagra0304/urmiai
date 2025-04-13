import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, googleSignIn, githubSignIn, twitterSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      const userCredential = await signUp(email, password);
      
      // This is where you would save additional user data like username to your database
      // For example, using Firebase Firestore:
      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   username,
      //   email,
      //   createdAt: new Date(),
      // });
      
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: () => Promise<any>) => {
    try {
      setError('');
      setLoading(true);
      await provider();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to get started</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn primary-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="social-divider">
          <span>or continue with</span>
        </div>
        
        <div className="social-login">
          <button
            type="button"
            className="social-btn google-btn"
            onClick={() => handleSocialSignIn(googleSignIn)}
            disabled={loading}
          >
            <FaGoogle /> Continue with Google
          </button>
          
          <button
            type="button"
            className="social-btn github-btn"
            onClick={() => handleSocialSignIn(githubSignIn)}
            disabled={loading}
          >
            <FaGithub /> Continue with GitHub
          </button>
          
          <button
            type="button"
            className="social-btn twitter-btn"
            onClick={() => handleSocialSignIn(twitterSignIn)}
            disabled={loading}
          >
            <FaTwitter /> Continue with X
          </button>
        </div>
        
        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 