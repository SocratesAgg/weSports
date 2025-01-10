import React, { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = forwardRef(({ isOpen, toggleMenu, handleLogout}, ref) => {
  const navigate = useNavigate();
  console.log("navigate function:", navigate);

  return (
    <nav ref={ref} className={`menu ${isOpen ? 'visible' : 'hidden'}`}>
      <button className="close-btn" onClick={toggleMenu}>☰</button>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/schools">Schools</Link></li>
        <li><Link to="/updates">Updates</Link></li>
        <li><button onClick={handleLogout}>Log out</button></li>
      </ul>
    </nav>
  );
});

export default Menu;
