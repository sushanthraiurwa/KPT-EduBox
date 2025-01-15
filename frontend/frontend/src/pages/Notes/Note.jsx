import React, { useState } from 'react';
import axios from 'axios';
import './Note.css';
import { Link } from 'react-router-dom';

const Note = () => {
  const [branch, setBranch] = useState(""); // Branch state
  const [semester, setSemester] = useState(""); // Semester state
  const [subjects, setSubjects] = useState(""); // Fetched subjects
  const [modules, setModules] = useState(""); // Modules for a subject
  const [selectedSubject, setSelectedSubject] = useState(null); // Selected subject
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [isDataFetched, setIsDataFetched] = useState(false); // Subject fetch status
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/subjects", {
        params: { branch, semester },
      });
      setSubjects(response.data);
      setIsDataFetched(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrorMessage("Failed to fetch subjects. Please try again.");
    }
  };

  const fetchModules = async (subjectName) => {
    try {
      const response = await axios.get("http://localhost:8080/api/unit", {
        params: { branch, semester, subject: subjectName },
      });
      setModules(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching modules:", error);
      setErrorMessage("Failed to fetch modules. Please try again.");
    }
  };

  const handleShowSubjects = () => {
    if (!branch || !semester) {
      setErrorMessage("Please select Branch and Semester to continue.");
      setIsDataFetched(false);
    } else {
      fetchSubjects();
    }
  };

  const handleMoreClick = (subject) => {
    if (selectedSubject === subject) {
      setDropdownVisible(!dropdownVisible);
    } else {
      setSelectedSubject(subject);
      setDropdownVisible(true);
      fetchModules(subject.subject);
    }
  };

  return (
    <div className="note-container">
      <h1 className="notes-heading">NOTES</h1>
      
      <div className="branch-container">
        <Link to="/loginnotes" className="login-button">
          Login
        </Link>
        <h1 className="branch-title">Select Branch</h1>
        <div className="branch-buttons">
          {['CS', 'EC', 'EEE', 'CE', 'AT', 'CH', 'ME', 'PO'].map((branchOption) => (
            <button
              key={branchOption}
              onClick={() => setBranch(branchOption)}
              className={`branch-button ${branch === branchOption ? "selected" : ""}`}
            >
              {branchOption}
            </button>
          ))}
        </div>
      </div>

      <div className="semester-container">
        <h2 className="semester-title">Select Semester</h2>
        <div className="semester-buttons">
          {['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5'].map((sem) => (
            <button
              key={sem}
              onClick={() => setSemester(sem)}
              className={`semester-button ${semester === sem ? "selected" : ""}`}
            >
              {sem}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleShowSubjects} className="show-subjects-btn">
          Show Subjects
        </button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {isDataFetched && (
        <div className="subjects-container">
          <h2 className="subjects-title">Available Subjects</h2>
          <ul className="subjects-list">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <li key={subject.id} className="subject-item">
                  {subject.subject}
                  <button 
                    onClick={() => handleMoreClick(subject)} 
                    className="subject-more-btn"
                  >
                    More
                  </button>
                  {selectedSubject === subject && dropdownVisible && (
                    <div className="module-dropdown">
                      <h3>Modules for {subject.subject}</h3>
                      <table className="module-table">
                        <thead>
                          <tr>
                            <th>Module No</th>
                            <th>Module Name</th>
                            <th>PDF Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules.length > 0 ? (
                            modules.map((module, index) => (
                              <tr key={index}>
                                <td>{module.moduleNo}</td>
                                <td>{module.moduleName}</td>
                                <td>
                                  <a
                                    href={module.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View PDF
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No modules found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li>No Subjects Found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Note;
