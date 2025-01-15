import React from "react";
import "./Home.css";
import sampleImage from "./home_photo.jpg"; // Replace with your image path
import Note from "../Notes/Note";
import Desc from "./Desc";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Complete Guide For Diploma Students</h1>
            <p>Learning App For Diploma Students</p>
            <div className="hero-buttons">
            <Link className="cta-button" to="/about">Read More</Link>
            <Link className="cta-button secondary" to="/contact">Contact</Link>
              
            </div>
          </div>
          <div className="hero-image">
            <img src={sampleImage} alt="Learning App" />
          </div>
        </div>
        <div className="feature-section">
          <h2 className="feature-heading">Best Platform to Learn Everything</h2>
          <div className="feature-boxes">
            <div className="feature-box">
            <Link to="/notes">Notes</Link>
            </div>
            <div className="feature-box">
            <Link to="/questionpaper">Question Paper</Link>
            </div>
            <div className="feature-box">
            <Link to="/">Lab</Link>
            </div>
          </div>
        </div>
      </div>
      <Desc />
    </>
  );
};

export default Home;
