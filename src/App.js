import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Assessment from './components/Assessment';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>LMS Portal</h1>
          <div className="nav-container">
            <nav>
              {!isLoggedIn ? (
                <>
                  <Link to="/register" className="nav-link">Register</Link>
                  <Link to="/login" className="nav-link">Login</Link>
                </>
              ) : (
                <>
                  <Link to="/courses" className="nav-link">Courses</Link>
                  <button 
                    onClick={handleLogout} 
                    className="nav-link" 
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      boxShadow: 'none', 
                      minWidth: 'auto', 
                      padding: '10px 20px'
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="App-content">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route 
              path="/courses" 
              element={isLoggedIn ? <CourseList /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/course/:id" 
              element={isLoggedIn ? <CourseDetail /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/assessment/:id" 
              element={isLoggedIn ? <Assessment /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;