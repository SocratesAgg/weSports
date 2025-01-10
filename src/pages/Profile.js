import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Move hooks outside the conditional block
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const userEmail = localStorage.getItem('userEmail'); // Assuming you store the email in localStorage during login
      if (userEmail) {
        fetchUserData(userEmail);
      } else {
        setError('No user is logged in');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchUserData = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${email}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-card">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-image" />
        <h2>{userData.fullName}</h2>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
        <p>Joined: {new Date(userData.dateOfJoin).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;
