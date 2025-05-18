import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: ''
  });
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  
  // On component mount, load existing users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('lmsUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Check if email already exists
    const emailExists = users.some(user => 
      user.email.toLowerCase() === formData.email.toLowerCase()
    );
    
    if (emailExists) {
      setError('This email is already registered. Please use a different email or login.');
      return;
    }
    
    // Validate password strength
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters and include at least one number and one special character.');
      return;
    }
    
    // Add new user to users array
    const updatedUsers = [...users, formData];
    
    // Save to localStorage
    localStorage.setItem('lmsUsers', JSON.stringify(updatedUsers));
    
    // Update state
    setUsers(updatedUsers);
    setRegistered(true);
    setError('');
  };

  const handleLogin = () => {
    // Auto-login after registration
    if (registered) {
      // Store logged in user info (except password) in localStorage
      const { password, ...userInfo } = formData;
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      
      // Update login state
      setIsLoggedIn(true);
      
      // Navigate to courses
      navigate('/courses');
    } else {
      // Just navigate to login page
      navigate('/login');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', dateOfBirth: '', phone: '' });
    setRegistered(false);
    setError('');
  };

  // Common input field style
  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  // Common form group style
  const formGroupStyle = {
    width: '100%',
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  // Label style
  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    textAlign: 'left',
    width: '100%'
  };

  // Help text style
  const helpTextStyle = {
    display: 'block',
    textAlign: 'left',
    marginTop: '5px',
    fontSize: '14px',
    color: '#666'
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      
      {registered ? (
        <div className="success-message">
          <p>Registration successful for {formData.name}!</p>
          <div 
            style={{ 
              display: 'flex', 
              gap: '15px', 
              justifyContent: 'center', 
              marginTop: '20px' 
            }}
          >
            <button onClick={handleLogin}>
              Continue to Courses
            </button>
            <button 
              onClick={resetForm}
              style={{
                background: 'linear-gradient(135deg, var(--secondary-color), var(--secondary-dark))'
              }}
            >
              Register Another User
            </button>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div 
              className="error-message" 
              style={{
                backgroundColor: 'rgba(230, 57, 70, 0.08)',
                border: '1px solid var(--danger-color)',
                borderLeft: '4px solid var(--danger-color)',
                padding: '15px 20px',
                borderRadius: 'var(--border-radius)',
                marginBottom: '25px',
                color: 'var(--danger-color)',
                fontWeight: '500'
              }}
            >
              {error}
            </div>
          )}
          
          <form 
            onSubmit={handleSubmit} 
            style={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            {/* Name field */}
            <div style={formGroupStyle}>
              <input 
                name="name" 
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange} 
                required 
                style={inputStyle}
              />
            </div>
            
            {/* Email field */}
            <div style={formGroupStyle}>
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange} 
                required 
                style={inputStyle}
              />
            </div>
            
            {/* Date of Birth field */}
            <div style={formGroupStyle}>
              <label 
                htmlFor="dateOfBirth" 
                style={labelStyle}
              >
              </label>
              <input 
                id="dateOfBirth"
                name="dateOfBirth" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={handleChange} 
                required 
                style={inputStyle}
              />
            </div>
            
            {/* Phone Number field */}
            <div style={formGroupStyle}>
              <input 
                name="phone" 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange} 
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                style={inputStyle}
              />
              <small style={helpTextStyle}>
              </small>
            </div>
            
            {/* Password field */}
            <div style={formGroupStyle}>
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange} 
                required 
                minLength="8"
                pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                title="Password must be at least 8 characters and include at least one number and one special character"
                style={inputStyle}
              />
              <small style={helpTextStyle}>
                Password must be at least 8 characters with at least one number and one special character
              </small>
            </div>
            
            {/* Button container */}
            <div 
              style={{ 
                display: 'flex', 
                gap: '15px', 
                width: '100%', 
                justifyContent: 'center',
                marginTop: '15px'
              }}
            >
              <button 
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Register
              </button>
              <button 
                type="button" 
                onClick={handleLogin}
                style={{
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  background: 'linear-gradient(135deg, var(--text-light), var(--dark-bg))'
                }}
              >
                I Already Have an Account
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Register;