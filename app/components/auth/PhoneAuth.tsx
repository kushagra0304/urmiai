import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setupRecaptcha, verifyOtp } = useAuth();
  const navigate = useNavigate();
  
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      return setError('Please enter a valid phone number');
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Format phone number with country code if needed
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      
      await setupRecaptcha(formattedNumber);
      setStep('otp');
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      return setError('Please enter a valid 6-digit OTP');
    }
    
    try {
      setError('');
      setLoading(true);
      await verifyOtp(otp);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Only allow digits
    const sanitizedValue = value.replace(/\D/g, '');
    
    if (sanitizedValue.length <= 6) {
      setOtp(sanitizedValue);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Phone Authentication</h1>
          <p className="auth-subtitle">
            {step === 'phone' ? 'Enter your phone number to receive an OTP' : 'Enter the OTP sent to your phone'}
          </p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-input"
                placeholder="+91 1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            
            {/* Hidden recaptcha container */}
            <div id="recaptcha-container"></div>
            
            <button 
              type="submit" 
              className="auth-btn primary-btn"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <div className="form-group">
              <label htmlFor="otp" className="form-label">Enter 6-digit OTP</label>
              <input
                type="text"
                id="otp"
                className="form-input"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-btn primary-btn"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <button 
              type="button" 
              className="auth-btn secondary-btn"
              onClick={() => setStep('phone')}
              disabled={loading}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneAuth; 