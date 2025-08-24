import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';
import './EnterpriseL.css';

function EnterpriseL() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const {
    currentStep,
    loading,
    error,
    successMessage,
    formData,
    setFormData,
    setError,
    clearMessages,
    sendOTP,
    registerAdmin,
    resetFlow,
    login
  } = useAuthStore();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (!loginData.email || !loginData.password) {
      setError('Please enter both email and password');
      return;
    }

    console.log('Attempting login with:', { 
      email: loginData.email, 
      passwordLength: loginData.password.length,
      passwordFirstChar: loginData.password.charAt(0),
      passwordLastChar: loginData.password.charAt(loginData.password.length - 1)
    });
    
    const success = await login(loginData.email.trim(), loginData.password);
    console.log('Login success result:', success);
    
    if (success) {
      console.log('Navigating to dashboard...');
      navigate('/enterprise/dashboard');
    } else {
      console.log('Login failed, staying on login page');
    }
  };

  const handleRegisterStep = async (e) => {
    e.preventDefault();
    clearMessages();

    if (currentStep === 1) {
      if (!formData.email) {
        setError('Please enter a valid email');
        return;
      }
      await sendOTP(formData.email.trim());
    } else if (currentStep === 2) {
      if (!formData.name || !formData.password || !formData.otp) {
        setError('Please fill in all fields');
        return;
      }
      await registerAdmin();
      const state = useAuthStore.getState();
      if (state.token) {
        navigate('/enterprise/dashboard');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearMessages();
    resetFlow();
    setLoginData({ email: '', password: '' });
  };

  if (isLogin) {
    return (
      <div className="enterprise-login">
        <h2>Enterprise Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
              disabled={loading}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              disabled={loading}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <small style={{ color: '#666', fontSize: '0.8em' }}>
              Password length: {loginData.password.length} characters
            </small>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p>
          Don't have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
            Sign up here
          </a>
        </p>
      </div>
    );
  }

  // Registration flow
  return (
    <div className="enterprise-login">
      <h2>Enterprise Registration</h2>
      <p>Step {currentStep} of 2</p>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleRegisterStep}>
        {currentStep === 1 && (
          <div className="form-group">
            <label htmlFor="reg-email">Email Address:</label>
            <input
              type="email"
              id="reg-email"
              value={formData.email}
              onChange={(e) => setFormData('email', e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email to receive OTP"
            />
          </div>
        )}

        {currentStep === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="reg-email-display">Email:</label>
              <input
                type="email"
                id="reg-email-display"
                value={formData.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData('name', e.target.value)}
                required
                disabled={loading}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password:</label>
              <input
                type="password"
                id="reg-password"
                value={formData.password}
                onChange={(e) => setFormData('password', e.target.value)}
                required
                disabled={loading}
                placeholder="Create a password"
                autoComplete="current-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="otp">OTP Code:</label>
              <input
                type="text"
                id="otp"
                value={formData.otp}
                onChange={(e) => setFormData('otp', e.target.value)}
                placeholder="Enter the OTP sent to your email"
                required
                disabled={loading}
              />
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (currentStep === 1 ? 'Send OTP' : 'Create Account')}
          </button>
          {currentStep === 2 && (
            <button type="button" onClick={resetFlow} disabled={loading}>
              Back to Email
            </button>
          )}
        </div>
      </form>

      <p>
        Already have an account?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
          Sign in here
        </a>
      </p>
    </div>
  );
}

export default EnterpriseL;