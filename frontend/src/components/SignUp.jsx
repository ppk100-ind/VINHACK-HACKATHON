import React, { useState } from 'react';
import { signUp } from '../firebase';

const SignUp = ({ switchToSignIn }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      return setError('Please enter your full name');
    }
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(formData.email, formData.password);
    } catch (error) {
      console.error('Sign up error:', error);
      let errorMessage = 'An error occurred during sign up.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = (
            <div>
              An account with this email already exists. 
              <button 
                type="button" 
                onClick={switchToSignIn}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginLeft: '5px'
                }}
              >
                Sign in instead?
              </button>
            </div>
          );
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <div className="signin-form">
          <h1 className="signin-title">SIGN UP</h1>
          <p className="signin-subtitle">First Create an account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="signin-form-content">
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
                className="signin-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="signin-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                disabled={loading}
                className="signin-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                disabled={loading}
                className="signin-input"
              />
            </div>
            
            <button type="submit" disabled={loading} className="signin-button">
              {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
            </button>
          </form>
          
          <div className="signin-footer">
            <span className="signup-text">Already have an account?</span>
            <button 
              type="button" 
              onClick={switchToSignIn}
              className="signup-link"
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;