import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaKey, 
  FaArrowLeft, 
  FaShieldAlt, 
  FaUserLock, 
  FaCheck 
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import '../components/auth/Auth.css';

export default function ForgotPasswordRoute() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'request' | 'success'>('request');
  
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return toast.error('Please enter your email address');
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      
      setStep('success');
      toast.success('Password reset link sent to your email!');
    } catch (error: any) {
      let errorMessage = 'Failed to reset password';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackToLogin = () => {
    navigate('/login', { state: { passwordReset: step === 'success' } });
  };
  
  return (
    <div className="auth-container">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="auth-card">
        {/* Left banner section */}
        <div className="auth-banner">
          <div className="banner-content">
            <div className="banner-logo">
              <FaKey className="logo-icon" />
              <span>URMI</span>
            </div>
            
            <h2 className="banner-title">Reset Password</h2>
            <p className="banner-subtitle">We'll help you get back into your account</p>
            
            <div className="banner-features">
              <div className="feature-item">
                <span className="feature-icon">
                  <FaShieldAlt />
                </span>
                <span>Secure Process</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <FaCheck />
                </span>
                <span>Quick Recovery</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <FaUserLock />
                </span>
                <span>Email Verification</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right form section */}
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              {step === 'request'
                ? 'Enter your email to receive a reset link'
                : 'Check your email for reset instructions'}
            </p>
          </div>
          
          {step === 'request' ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="input-icon" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  disabled={loading}
                  autoFocus
                />
              </div>
              
              <button 
                type="submit" 
                className="auth-btn primary-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              
              <button 
                type="button"
                className="auth-btn secondary-btn"
                onClick={handleBackToLogin}
                disabled={loading}
              >
                <FaArrowLeft /> Back to Login
              </button>
              
              <div className="auth-footer">
                Remember your password?{' '}
                <Link to="/login" className="auth-link">Sign In</Link>
              </div>
            </form>
          ) : (
            <div className="success-container">
              <div className="success-message">
                We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions to reset your password.
              </div>
              
              <div className="reset-info">
                <p>Didn't receive the email?</p>
                <ul>
                  <li>Check your spam or junk folder</li>
                  <li>Verify you entered the correct email</li>
                  <li>Wait a few minutes for the email to arrive</li>
                </ul>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: '2rem' }}>
                <button 
                  type="button" 
                  className="auth-btn primary-btn"
                  onClick={() => setStep('request')}
                >
                  Try Again
                </button>
                
                <button 
                  type="button"
                  className="auth-btn secondary-btn"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 