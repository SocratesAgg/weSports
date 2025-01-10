import React, { useEffect, useState } from 'react';
import './Header.css';

function Header({ toggleMenu }) {
    const [name, setName] = useState('Guest');
  
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setName(parsedUser.fullName); // Assuming 'fullName' is a column in your SQLite table
      }
    }, []);
    
    return (
    <header className="header">
      <div className="menu-icon" onClick={toggleMenu}>☰</div>
      <div className="header-content">
      <h1 className="title">Hello {name}</h1>
      </div>
      <img 
        src="https://i.ibb.co/7gybXF0/c6edf26c-65e7-4050-9692-4a6f8fbc927a.jpg" 
        alt="Sports Banner" 
        className="header-image" 
      />
    </header>
  );
}

export default Header;
