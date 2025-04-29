import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import '../components/auth/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-banner">
          <div className="banner-content">
            <div className="banner-logo">
              <span className="logo-icon">🤖</span>
              <span>Urmi AI</span>
            </div>
            <h1 className="banner-title">Forgot Password?</h1>
            <p className="banner-subtitle">
              Don't worry, we'll help you reset your password
            </p>
          </div>
        </div>
        
        <div className="auth-form-container">
          {!emailSent ? (
            <>
              <div className="auth-header">
                <h2 className="auth-title">Reset Password</h2>
                <p className="auth-subtitle">Enter the email associated with your account</p>
              </div>
              
              <form className="auth-form" onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label className="form-label">
                    <FiMail className="input-icon" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="auth-btn primary-btn"
                  disabled={loading}
                >
                  {loading ? 'Sending Email...' : 'Send Reset Email'}
                </button>
              </form>
            </>
          ) : (
            <div className="success-container">
              <div className="auth-header">
                <h2 className="auth-title">Email Sent!</h2>
                <p className="auth-subtitle">Check your inbox to reset your password</p>
              </div>
              
              <div className="reset-info">
                <p>We have sent password reset instructions to:</p>
                <p className="form-input" style={{ marginTop: '10px', marginBottom: '20px' }}>{email}</p>
                
                <ul>
                  <li>Check your spam folder if you don't see the email</li>
                  <li>The link in the email will expire in 10 minutes</li>
                  <li>You can request another reset email if needed</li>
                </ul>
                
                <button 
                  onClick={() => setEmailSent(false)} 
                  className="auth-btn secondary-btn"
                  style={{ marginTop: '20px' }}
                >
                  Send Again
                </button>
              </div>
            </div>
          )}
          
          <div className="auth-footer">
            <Link to="/login" className="auth-link">Return to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 