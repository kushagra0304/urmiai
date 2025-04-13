import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaGoogle, 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaUserPlus, 
  FaCheckCircle, 
  FaShieldAlt,
  FaUserLock,
  FaCheck
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import '../components/auth/Auth.css';

export default function RegisterRoute() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { signUp, googleSignIn, githubSignIn, twitterSignIn } = useAuth();
  const navigate = useNavigate();

  // Password strength checks
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar
  ].filter(Boolean).length;

  const getPasswordStrengthLabel = () => {
    if (password.length === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (password.length === 0) return '#777';
    if (passwordStrength <= 2) return '#ff3b30';
    if (passwordStrength <= 4) return '#ffcc00';
    return '#34c759';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return toast.error('Please enter a username');
    }
    
    if (!email.trim()) {
      return toast.error('Please enter your email');
    }
    
    if (password.length < 8) {
      return toast.error('Password must be at least 8 characters long');
    }
    
    if (passwordStrength < 3) {
      return toast.error('Please use a stronger password');
    }
    
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    
    if (!termsAccepted) {
      return toast.error('Please accept the terms and conditions');
    }
    
    try {
      setLoading(true);
      const userCredential = await signUp(email, password);
      
      // This is where you would save additional user data like username to your database
      // For example, using Firebase Firestore:
      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   username,
      //   email,
      //   createdAt: new Date(),
      // });
      
      toast.success('Account created successfully!');
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 1500);
    } catch (error: any) {
      let errorMessage = 'Failed to create an account';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: () => Promise<any>, providerName: string) => {
    try {
      setLoading(true);
      await provider();
      
      toast.success(`Signed up with ${providerName}!`);
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      let errorMessage = `Failed to sign up with ${providerName}`;
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign up was cancelled';
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
              <FaUserPlus className="logo-icon" />
              <span>URMI</span>
            </div>
            
            <h2 className="banner-title">Join Our Community</h2>
            <p className="banner-subtitle">Create an account to access exclusive features and personalized services</p>
            
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
                <span>Personalized Experience</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">
                  <FaUserLock />
                </span>
                <span>Data Privacy</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right form section */}
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Fill in your details to get started</p>
          </div>
        
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <FaUser className="input-icon" /> Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="johndoe"
                disabled={loading}
                autoFocus
              />
            </div>
        
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
              />
            </div>
          
            <div className="form-row">
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
              
                {password && (
                  <div className="password-strength">
                    <div className="strength-meter">
                      <div 
                        className="strength-meter-fill" 
                        style={{ 
                          width: `${(passwordStrength / 5) * 100}%`,
                          backgroundColor: getStrengthColor()
                        }}
                      ></div>
                    </div>
                    <span style={{ color: getStrengthColor() }}>
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <FaLock className="input-icon" /> Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  disabled={loading}
                />
                
                {confirmPassword && (
                  <div className={`password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                    <FaCheckCircle />
                    {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                  </div>
                )}
              </div>
            </div>
            
            {password && (
              <div className="password-requirements">
                <div className={`requirement ${hasMinLength ? 'met' : ''}`}>
                  {hasMinLength ? <FaCheckCircle /> : '•'} 8+ characters
                </div>
                <div className={`requirement ${hasUpperCase ? 'met' : ''}`}>
                  {hasUpperCase ? <FaCheckCircle /> : '•'} Uppercase
                </div>
                <div className={`requirement ${hasLowerCase ? 'met' : ''}`}>
                  {hasLowerCase ? <FaCheckCircle /> : '•'} Lowercase
                </div>
                <div className={`requirement ${hasNumber ? 'met' : ''}`}>
                  {hasNumber ? <FaCheckCircle /> : '•'} Number
                </div>
                <div className={`requirement ${hasSpecialChar ? 'met' : ''}`}>
                  {hasSpecialChar ? <FaCheckCircle /> : '•'} Special char
                </div>
              </div>
            )}
            
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                <span className="terms-container">
                  I accept the <Link to="/terms" className="auth-link">Terms of Service</Link> and <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="auth-btn primary-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="social-divider">
              <span>or sign up with</span>
            </div>
            
            <div className="social-login">
              <button
                type="button"
                className="social-btn google-btn"
                onClick={() => handleSocialSignIn(googleSignIn, 'Google')}
                disabled={loading}
              >
                <FaGoogle />
              </button>
              
              <button
                type="button"
                className="social-btn github-btn"
                onClick={() => handleSocialSignIn(githubSignIn, 'GitHub')}
                disabled={loading}
              >
                <FaGithub />
              </button>
              
              <button
                type="button"
                className="social-btn twitter-btn"
                onClick={() => handleSocialSignIn(twitterSignIn, 'X')}
                disabled={loading}
              >
                <FaTwitter />
              </button>
            </div>
            
            <div className="auth-footer">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 