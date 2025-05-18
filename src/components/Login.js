import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    
    // Find user with matching email
    const user = users.find(user => 
      user.email.toLowerCase() === formData.email.toLowerCase()
    );
    
    // Check if user exists and password matches
    if (!user) {
      setError('Email not found. Please register first.');
      return;
    }
    
    if (user.password !== formData.password) {
      setError('Incorrect password. Please try again.');
      return;
    }
    
    // Login successful
    // Store logged in user info (except password) in localStorage
    const { password, ...userInfo } = user;
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
    // Update login state
    setIsLoggedIn(true);
    
    // Navigate to courses page
    navigate('/courses');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      
      {error && (
        <div className="error-message" style={{
          backgroundColor: 'rgba(230, 57, 70, 0.08)',
          border: '1px solid var(--danger-color)',
          borderLeft: '4px solid var(--danger-color)',
          padding: '15px 20px',
          borderRadius: 'var(--border-radius)',
          marginBottom: '25px',
          color: 'var(--danger-color)',
          fontWeight: '500'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange} 
          required 
        />
        <div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }}>
          <button type="submit">Login</button>
          <button 
            type="button" 
            onClick={handleRegister}
            style={{
              background: 'linear-gradient(135deg, var(--secondary-color), var(--secondary-dark))'
            }}
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;