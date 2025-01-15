import React from "react";
import "./Desc.css";
import illustration from "./Desc.png"; // Replace with your image path

const Desc = () => {
  return (
    <section className="unique-section">
      <div className="unique-content">
        <h2>A learning hub where you access the best, high-quality notes</h2>
        <p>
          crafted by professors through their students. We've collected these
          valuable resources and paired them with relevant YouTube tutorials to
          streamline your learning.
        </p>
        <p className="unique-highlight">
          Whether you're preparing for CIE's or SEE's, <strong>EduBox</strong>{" "}
          brings together expert knowledge and visual guides to help you learn
          faster and smarter. Dive in and elevate your study experience.
        </p>
      </div>
      <div className="unique-illustration">
        <img src={illustration} alt="Educational Illustration" />
      </div>
    </section>
  );
};

export default Desc;
