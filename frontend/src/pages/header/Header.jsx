import React from 'react';
import './Header.css';
import logo from './logo.png';



const Header= () => {
  return (
    <div className="header">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1 className="site-name">EduBox</h1>
      </div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#notes">Notes</a>
        <a href="#question-paper">Question Paper</a>
        <a href="#contact-us">Contact Us</a>
      </nav>
    </div>
  );
};

export default Header;