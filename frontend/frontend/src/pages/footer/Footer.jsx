import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="custom-footer-content">
        <div className="custom-footer-section about-section">
          <h2>EduBox</h2>
          <p>Your complete guide for diploma students, providing notes, question papers, and lab resources.</p>
        </div>
        <div className="custom-footer-section links-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/notes">Notes</a></li>
            <li><a href="/questionpaper">Question Papers</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="custom-footer-section social-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="custom-footer-bottom">
        <p>&copy; {new Date().getFullYear()} EduBox. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
