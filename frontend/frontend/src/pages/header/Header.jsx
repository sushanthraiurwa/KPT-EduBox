import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-logo-section">
        <Link to="/">
          <img src={logo} alt="Logo" className="header-logo" />
        </Link>
        <Link to="/" className="header-site-name">
          EduBox
        </Link>
      </div>
      <nav className="header-nav">
      <Link to="/" className="header-nav-link">Home</Link>
        <Link to="/about" className="header-nav-link">About</Link>
        <Link to="/notes" className="header-nav-link">Notes</Link>
        <Link to="/questionpaper" className="header-nav-link">Question Paper</Link>
        <Link to="/contact" className="header-nav-link">Contact Us</Link>
        
      </nav>
    </header>
  );
};

export default Header;
