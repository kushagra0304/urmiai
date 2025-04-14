import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaGoogle, 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaLock, 
  FaUserCircle, 
  FaShieldAlt, 
  FaUserLock, 
  FaCheck 
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import '../components/auth/Auth.css';

export default function LoginRoute() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, googleSignIn, githubSignIn, twitterSignIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);
  
  useEffect(() => {
    // Check if coming from registration or password reset
    if (location.state?.registered) {
      toast.success('Registration successful! Please log in.');
    } else if (location.state?.passwordReset) {
      toast.success('Password reset link sent! Please check your email.');
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return toast.error('Please enter your email');
    }
    
    if (!password) {
      return toast.error('Please enter your password');
    }
    
    try {
      setLoading(true);
      await login(email, password);
      
      toast.success('Login successful!');
      
      // Store email in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Redirect after a short delay to allow toast to be seen
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error: any) {
      let errorMessage = 'Failed to log in';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many login attempts. Please try again later';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: () => Promise<any>, providerName: string) => {
    try {
      setLoading(true);
      await provider();
      
      toast.success(`Logged in with ${providerName}!`);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error: any) {
      let errorMessage = `Failed to sign in with ${providerName}`;
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in was cancelled';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address but different sign-in credentials';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
              <FaUserLock className="logo-icon" />
              <span>URMI</span>
            </div>
            
            <h2 className="banner-title">Welcome Back!</h2>
            <p className="banner-subtitle">Sign in to access your dashboard and manage your account</p>
            
            <div className="banner-features">
              <div className="feature-item">
                <span className="feature-icon">
                  <FaShieldAlt />
                </span>
                <span>Secure Authentication</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <FaCheck />
                </span>
                <span>Easy Login Options</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <FaUserCircle />
                </span>
                <span>Personalized Dashboard</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right form section */}
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Enter your credentials to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaEnvelope className="input-icon" /> Email
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
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FaLock className="input-icon" /> Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              
              <Link to="/forgot-password" className="auth-link">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="auth-btn primary-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="social-divider">
              <span>or continue with</span>
            </div>
            
            <div className="social-login">
              <button
                type="button"
                className="social-btn google-btn"
                onClick={() => handleSocialLogin(googleSignIn, 'Google')}
                disabled={loading}
              >
                <FaGoogle />
              </button>
              
              <button
                type="button"
                className="social-btn github-btn"
                onClick={() => handleSocialLogin(githubSignIn, 'GitHub')}
                disabled={loading}
              >
                <FaGithub />
              </button>
              
              <button
                type="button"
                className="social-btn twitter-btn"
                onClick={() => handleSocialLogin(twitterSignIn, 'X')}
                disabled={loading}
              >
                <FaTwitter />
              </button>
            </div>
            
            <div className="auth-footer">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
