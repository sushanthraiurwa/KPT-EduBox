// About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About EduBox</h1>
      
      <p className="about-description">
        Welcome to <strong>EduBox</strong>, your complete guide for diploma students! We aim to provide
        everything you need to excel in your studies, including:
      </p>
      
      <ul className="about-list">
        <li>Comprehensive notes for all subjects.</li>
        <li>Previous years' question papers to help you prepare effectively.</li>
        <li>Lab resources and guides to support practical learning.</li>
      </ul>

      <h2 className="about-subtitle">Our Vision</h2>
      <p className="about-vision">
        At EduBox, our vision is to become the leading platform for diploma students globally, providing
        the most comprehensive, up-to-date resources, and fostering a community of learners who support one another.
      </p>
      
      <h2 className="about-subtitle">Our Services</h2>
      <p className="about-services">
        We offer a wide range of services designed to support diploma students:
      </p>
      <ul className="about-services-list">
        <li>Easy-to-navigate study material with notes for various diploma courses.</li>
        <li>Downloadable past year papers for exam practice.</li>
        <li>Access to educational webinars and live sessions.</li>
        <li>Expert advice and tips on how to excel in exams.</li>
      </ul>

      <h2 className="about-subtitle">Meet Our Team</h2>
      <p className="about-team">
        Our team consists of experienced educators, content creators, and diploma students who are passionate
        about education and making learning accessible. Together, we aim to empower students by providing high-quality
        educational resources.
      </p>
      
      <h2 className="about-subtitle">Why Choose EduBox?</h2>
      <p className="about-why-choose">
        EduBox is designed with the needs of diploma students in mind. We focus on providing easy access to
        well-organized resources that help you prepare effectively for your exams and succeed in your academic journey.
      </p>

      <p className="about-thankyou">
        Thank you for choosing EduBox as your study companion! We are here to help you achieve your educational
        goals.
      </p>
    </div>
  );
};

export default About;
