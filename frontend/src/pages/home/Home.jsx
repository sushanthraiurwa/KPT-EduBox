import React from 'react';
import './Home.css';
import sampleImage from './home_photo.jpg'; // Replace with your image path

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="text-section">
          <h1>Complete Guide For Diploma Students.</h1>
          <p>Learning App For Diploma Students</p>
        </div>
        <div className="image-section">
          <img src={sampleImage} alt="Learning App" className="main-image" />
        </div>
      </div>
      <div className="buttons-section">
        <button className="custom-button">Notes</button>
        <button className="custom-button">Question Papers</button>
        <button className="custom-button">Lab</button>
      </div>
    </div>
  );
};

export default Home;