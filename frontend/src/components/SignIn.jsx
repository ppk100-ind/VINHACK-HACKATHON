import React, { useState } from 'react';
import { signIn } from '../firebase';

const SignIn = ({ switchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    try {
      setError('');
      setLoading(true);
      await signIn(formData.email, formData.password);
    } catch (error) {
      console.error('Sign in error:', error);
      let errorMessage = 'An error occurred during sign in.';
      
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
          errorMessage = (
            <div>
              No account found with this email. 
              <button 
                type="button" 
                onClick={switchToSignUp}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginLeft: '5px'
                }}
              >
                Create an account instead?
              </button>
            </div>
          );
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
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
          <h1 className="signin-title">SIGN IN</h1>
          <p className="signin-subtitle">Enter Your Email and Password</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="signin-form-content">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                disabled={loading}
                className="signin-input"
              />
            </div>
            
            <button type="submit" disabled={loading} className="signin-button">
              {loading ? 'SIGNING IN...' : 'LOG IN'}
            </button>
          </form>
          
          <div className="signin-footer">
            <span className="signup-text">Don't have an account?</span>
            <button 
              type="button" 
              onClick={switchToSignUp}
              className="signup-link"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;