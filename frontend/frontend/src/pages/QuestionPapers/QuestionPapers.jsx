import React, { useState } from "react";
import axios from "axios";
import "./QuestionPapers.css";
import { Link } from "react-router-dom";
const QuestionPapers = () => {
  const [branch, setBranch] = useState(""); // Initialize as an empty string
  const [semester, setSemester] = useState(""); // Initialize as an empty string
  const [year, setYear] = useState(""); // Initialize as an empty string
  const [questionPapers, setQuestionPapers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // To show error message
  const [isDataFetched, setIsDataFetched] = useState(false); // To track if data has been fetched

  // Fetch filtered question papers based on branch, semester, and year
  const fetchQuestionPapers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/questionpapers", {
        params: { branch, sem: semester, year } // Send query params to filter by branch, semester, year
      });
      setQuestionPapers(response.data);
      setIsDataFetched(true); // Set the flag to show the table
    } catch (error) {
      console.error("Error fetching question papers:", error);
      setErrorMessage("Failed to fetch question papers. Please try again.");
      setIsDataFetched(false); // Hide the table if there is an error
    }
  };

  const handleShowData = () => {
    if (!branch || !semester || !year) {
      // Check if any of the filters are not selected
      setErrorMessage("Please select Branch, Semester, and Year to continue.");
      setIsDataFetched(false); // Hide the table if filters are not selected
    } else {
      setErrorMessage(""); // Reset the error message
      fetchQuestionPapers();
    }
  };

  return (
    <div className="qp-unique-container">

<h1 className="question-heading">QUESTION PAPER</h1>
      <Link to="/loginqp" className="login-button">
                  Login
                </Link>
      <div className="qp-unique-branch-container">
  
        <h1 className="qp-unique-branch-title">Select Branch</h1>
        <div className="qp-unique-branch-buttons">
          {['CS', 'EC', 'EEE', 'CE', 'AT', 'CH', 'ME', 'PO'].map((branchOption) => (
            <button
              key={branchOption}
              onClick={() => setBranch(branchOption)}
              className={`qp-unique-branch-button ${branch === branchOption ? "selected" : ""}`}
            >
              {branchOption}
            </button>
          ))}
        </div>
      </div>

      <div className="qp-unique-selection-section">
        <h2 className="qp-unique-title">Select Semester</h2>
        <div className="qp-unique-buttons">
          {['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5'].map((sem) => (
            <button
              key={sem}
              onClick={() => setSemester(sem)}
              className={`qp-unique-semester-btn ${semester === sem ? "selected" : ""}`}
            >
              {sem}
            </button>
          ))}
        </div>
      </div>

      <div className="qp-unique-selection-section">
        <h2 className="qp-unique-title">Select Year</h2>
        <div className="qp-unique-buttons">
          {['2023', '2024'].map((yr) => (
            <button
              key={yr}
              onClick={() => setYear(yr)}
              className={`qp-unique-year-btn ${year === yr ? "selected" : ""}`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      <div className="qp-unique-action-buttons">
        <button onClick={handleShowData} className="qp-unique-show-btn">
          Show Question Paper
        </button>
      </div>

      {/* Display error message if any filter is not selected */}
      {errorMessage && <div className="qp-error-message">{errorMessage}</div>}

      {/* Display the data table only if data has been fetched */}
      {isDataFetched && (
        <div className="qp-app__container">
          <h1 className="qp-app__title">Question Paper Management</h1>

          {/* Display Question Papers in Table */}
          <table className="qp-table__container">
            <thead>
              <tr>
                <th className="qp-table__heading">Branch</th>
                <th className="qp-table__heading">Subject Name</th>
                <th className="qp-table__heading">CIE 1</th>
                <th className="qp-table__heading">CIE 2</th>
                <th className="qp-table__heading">CIE 3</th>
                <th className="qp-table__heading">SEE</th>
              </tr>
            </thead>
            <tbody>
              {questionPapers.length > 0 ? (
                questionPapers.map((qp) => (
                  <tr key={qp.id}>
                    <td className="qp-table__data">{qp.branch}</td>
                    <td className="qp-table__data">{qp.subjectName}</td>
                    <td className="qp-table__data">
                      <a href={qp.cie1} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td className="qp-table__data">
                      <a href={qp.cie2} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td className="qp-table__data">
                      <a href={qp.cie3} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td className="qp-table__data">
                      <a href={qp.see} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="qp-table__data">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuestionPapers;
