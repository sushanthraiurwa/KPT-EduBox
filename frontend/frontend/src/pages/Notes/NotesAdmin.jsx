import React, { useState } from "react";
import axios from "axios";
import "./NotesAdmin.css";

const NotesAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [semester, setSemester] = useState(""); // Semester state
  const [subjects, setSubjects] = useState([]); // Fetched subjects
  const [modules, setModules] = useState([]); // Modules for a subject
  const [selectedSubject, setSelectedSubject] = useState(null); // Selected subject
  const [isDataFetched, setIsDataFetched] = useState(false); // Subject fetch status
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  const [isAddSubjectVisible, setIsAddSubjectVisible] = useState(false); // Controls visibility of Add Subject form

  // For Add Unit form
  const [moduleNo, setModuleNo] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  // For Add Subject form
  const [newSubject, setNewSubject] = useState({
    branch: "",
    semester: "",
    subject: ""
  });

  const hodCredentials = [
    { email: "cs@college.com", password: "cs123", branch: "CS" },
    { email: "ec@college.com", password: "ec123", branch: "EC" },
    { email: "eee@college.com", password: "eee123", branch: "EEE" },
    { email: "ce@college.com", password: "ce123", branch: "CE" },
    { email: "at@college.com", password: "at123", branch: "AT" },
    { email: "ch@college.com", password: "ch123", branch: "CH" },
    { email: "me@college.com", password: "me123", branch: "ME" },
    { email: "po@college.com", password: "po123", branch: "PO" },
    { email: "pratyush@gmail.com", password: "pratyush"} // Add branch for Pratyush
  ];

  
  const handleLogin = (e) => {
    e.preventDefault();
    const hod = hodCredentials.find(
      (cred) =>
        cred.email === loginDetails.email && cred.password === loginDetails.password
    );

    if (loginDetails.email === "pratyush@gmail.com") {
      window.location.href = "/notes/login";  // Redirect to /questionpaper/login
      return;  // Prevent further logic execution if redirected
    }
    
    if (hod) {
      setIsLoggedIn(true);
      setErrorMessage("");
      setNewSubject({ ...newSubject, branch: hod.branch }); // Set branch from the logged-in user
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginDetails({ email: "", password: "" });
    setSemester("");
    setSubjects([]);
    setModules([]);
    setIsDataFetched(false);
    setErrorMessage("");
  };

  // Fetch subjects based on branch and semester
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/subjects", {
        params: { branch: newSubject.branch, semester },
      });
      setSubjects(response.data); // Update subjects
      setIsDataFetched(true); // Set fetched flag
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrorMessage("Failed to fetch subjects. Please try again.");
    }
  };

  const fetchModules = async (subjectName) => {
    try {
      const response = await axios.get("http://localhost:8080/api/unit", {
        params: { branch: newSubject.branch, semester, subject: subjectName },
      });
      setModules(response.data); // Update modules
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error fetching modules:", error);
      setErrorMessage("Failed to fetch modules. Please try again.");
    }
  };

  const handleShowSubjects = () => {
    if (!semester) {
      setErrorMessage("Please select Semester to continue.");
      setIsDataFetched(false);
    } else {
      fetchSubjects();
      setIsAddSubjectVisible(true); // Show Add Subject form after subjects are fetched
    }
  };

  const deleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:8080/api/subjects/${subjectId}`);
      setSubjects(subjects.filter((subject) => subject.id !== subjectId)); // Remove deleted subject from state
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error deleting subject:", error);
      setErrorMessage("Failed to delete subject. Please try again.");
    }
  };

  const deleteUnit = async (unitId) => {
    try {
      await axios.delete(`http://localhost:8080/api/unit/${unitId}`);
      setModules(modules.filter((module) => module.id !== unitId)); // Remove deleted unit from state
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error deleting unit:", error);
      setErrorMessage("Failed to delete unit. Please try again.");
    }
  };

  const addUnit = async () => {
    try {
      const unitData = {
        branch: newSubject.branch,
        semester,
        subject: selectedSubject.subject,
        moduleNo,
        moduleName,
        pdfLink,
      };
      const response = await axios.post("http://localhost:8080/api/unit", unitData);
      setModules([...modules, response.data]); // Update modules state with newly added unit
      setModuleNo("");
      setModuleName("");
      setPdfLink("");
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error adding unit:", error);
      setErrorMessage("Failed to add unit. Please try again.");
    }
  };

  const handleMoreClick = (subject) => {
    if (selectedSubject === subject) {
      setDropdownVisible(!dropdownVisible); // Toggle visibility
    } else {
      setSelectedSubject(subject);
      setDropdownVisible(true); // Show dropdown when a new subject is clicked
      fetchModules(subject.subject); // Use 'subject.subject' to fetch modules
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/subjects", newSubject);
      setSubjects([...subjects, response.data]); // Update subjects list
      setNewSubject({
        branch: newSubject.branch, // Set branch from the logged-in user
        semester: semester, // Set semester from the selected state
        subject: '', // Reset subject input
      });
      setErrorMessage(""); // Clear error message
      setIsAddSubjectVisible(true); // Show Add Subject form after adding subject
    } catch (error) {
      console.error("Error adding subject:", error);
      setErrorMessage("Failed to add subject. Please try again.");
    }
  };

  return (
    <div className="note-container">
      {!isLoggedIn ? (
        <div className="login-page">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={loginDetails.email}
              onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={loginDetails.password}
              onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
              required
            />
            <button type="submit" className="login-btn">Login</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      ) : (
        <div>
          <div className="admin-panel">
            <span className="admin-title">NOTES PAGE</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
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
                      <button
                        onClick={() => deleteSubject(subject.id)}
                        className="noteslogin-delete-unit-btn"
                      >
                        Delete
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
                                <th>Actions</th>
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
                                    <td>
                                      <button
                                        onClick={() => deleteUnit(module.id)}
                                        className="noteslogin-delete-unit-btn"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4">No modules found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                          {/* Add Unit Form */}
                          <div className="add-unit-form">
                            <h4>Add New Unit</h4>
                            <input
                              type="text"
                              placeholder="Module No"
                              value={moduleNo}
                              onChange={(e) => setModuleNo(e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Module Name"
                              value={moduleName}
                              onChange={(e) => setModuleName(e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="PDF Link"
                              value={pdfLink}
                              onChange={(e) => setPdfLink(e.target.value)}
                            />
                            <button onClick={addUnit} className="add-unit-btn">
                              Add Unit
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <div>No subjects available</div>
                )}
              </ul>
            </div>
          )}

          {isAddSubjectVisible && (
            <div className="add-subject-form">
              <form onSubmit={handleAddSubject}>
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={newSubject.subject}
                  onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Branch"
                  value={newSubject.branch} // Set branch from logged-in user
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Semester"
                  value={semester} // Ensure semester is set here
                  readOnly
                />
                <button type="submit" className="add-subject-btn">
                  Add Subject
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesAdmin;
