// branch.js
import React from "react";
import { Link } from "react-router-dom";
import "./Branch.css";

const Branch = () => {
  return (
    <div className="branch-container">
      <h1 className="title">Select Branch</h1>
      <div className="branch-buttons">
        {['CS', 'EC', 'EEE', 'CE', 'AT', 'CH', 'ME', 'PO'].map((branch) => (
          <Link key={branch} to={`/${branch}`} className="branch-button">
            {branch}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Branch;
