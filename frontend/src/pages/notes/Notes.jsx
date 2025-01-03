import React from "react";
import "./Notes.css";

const Notes = () => {
  const branches = ["CS", "EC", "EEE", "CE", "AT", "CH", "ME", "PO"];

  return (
    <div className="select-branch-container">
      <h1 className="select-title">Select Branch</h1>
      <div className="branch-buttons">
        {branches.map((branch, index) => (
          <button key={index} className="branch-button">
            {branch}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Notes;