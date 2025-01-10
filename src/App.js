// App.js
import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';  // No need to import BrowserRouter
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Profile from './pages/Profile';
import Schools from './pages/Schools';
import Updates from './pages/Updates';
import Login from './pages/Login';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Use useNavigate to redirect

  
  
  // Session validation effect
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/validate-session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User session validated:', data);
          setIsAuthenticated(true); // Set user as authenticated if session is valid
        } else {
          console.log('Session not valid');
          setIsAuthenticated(false); // Clear authentication if session is invalid
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Set loading to false after checking the session
      }
    };

    checkSession();
  }, []);

  // Handle logout function
  const handleLogout = () => {
    // Clear the session and authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);  // Update authentication status
    navigate('/login'); // Redirect to login page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional loading screen if session check is in progress
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Header toggleMenu={toggleMenu} />
          <Menu ref={menuRef} isOpen={menuOpen} toggleMenu={toggleMenu} handleLogout={handleLogout} />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

export default App;
