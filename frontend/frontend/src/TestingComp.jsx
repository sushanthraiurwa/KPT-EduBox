import React, { useState } from "react";
import axios from "axios";


const TestingComp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [branch, setBranch] = useState(""); // Automatically set from email
  const [semester, setSemester] = useState(""); // Semester state
  const [subjects, setSubjects] = useState([]); // Fetched subjects
  const [modules, setModules] = useState([]); // Modules for a subject
  const [selectedSubject, setSelectedSubject] = useState(null); // Selected subject
  const [isDataFetched, setIsDataFetched] = useState(false); // Subject fetch status

  // For Add Unit form
  const [moduleNo, setModuleNo] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    // Automatically set branch based on email domain
    const branchFromEmail = loginDetails.email.split("@")[0].toUpperCase();
    setBranch(branchFromEmail); // Set branch from email domain

    if (loginDetails.password === "password123") {
      setIsLoggedIn(true); // Assuming a password check here
      setErrorMessage(""); // Clear error message
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginDetails({ email: "", password: "" });
    setBranch("");
    setSemester("");
    setSubjects([]);
    setModules([]);
  };

  // Fetch subjects based on branch and semester
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/subjects", {
        params: { branch, semester },
      });
      setSubjects(response.data); // Update subjects
      setIsDataFetched(true); // Set fetched flag
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrorMessage("Failed to fetch subjects. Please try again.");
    }
  };

  // Fetch modules for a selected subject
  const fetchModules = async (subjectName) => {
    try {
      const response = await axios.get("http://localhost:8080/api/unit", {
        params: { branch, semester, subject: subjectName },
      });
      setModules(response.data); // Update modules
      setErrorMessage(""); // Clear error
    } catch (error) {
      console.error("Error fetching modules:", error);
      setErrorMessage("Failed to fetch modules. Please try again.");
    }
  };

  // Delete Unit
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

  // Delete Subject
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

  // Add Unit
  const addUnit = async () => {
    try {
      const unitData = {
        branch,
        semester,
        subject: selectedSubject.subject,
        moduleNo,
        moduleName,
        pdfLink
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

  // Show Subjects and Modules
  const handleShowSubjects = () => {
    if (!semester) {
      setErrorMessage("Please select Semester to continue.");
      setIsDataFetched(false);
    } else {
      fetchSubjects();
    }
  };

  return (
    <div className="note-container">
      <div className="admin-panel">
        {isLoggedIn ? (
          <>
            <p>Welcome, HOD of {branch}</p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
              />
              <button type="submit">Login</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </>
        )}
      </div>

      {isLoggedIn && (
        <div className="semester-container">
          <h2>Select Semester</h2>
          <div className="semester-buttons">
            {["Sem1", "Sem2", "Sem3", "Sem4", "Sem5"].map((sem) => (
              <button
                key={sem}
                onClick={() => setSemester(sem)}
                className={`semester-button ${semester === sem ? "selected" : ""}`}
              >
                {sem}
              </button>
            ))}
          </div>
          <button onClick={handleShowSubjects} className="show-subjects-btn">Show Subjects</button>
        </div>
      )}

      {isDataFetched && (
        <div className="subjects-container">
          <h2>Subjects for {branch}</h2>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id}>
                {subject.subject}
                <button onClick={() => fetchModules(subject.subject)} className="show-modules-btn">Show Modules</button>
                <button onClick={() => deleteSubject(subject.id)} className="delete-subject-btn">Delete Subject</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {modules.length > 0 && (
        <div className="modules-container">
          <h2>Modules for {selectedSubject?.subject}</h2>
          <table>
            <thead>
              <tr>
                <th>Module No</th>
                <th>Module Name</th>
                <th>PDF Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id}>
                  <td>{module.moduleNo}</td>
                  <td>{module.moduleName}</td>
                  <td>
                    <a href={module.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
                  </td>
                  <td>
                    <button onClick={() => deleteUnit(module.id)} className="delete-unit-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-unit-form">
            <h3>Add New Unit</h3>
            <input type="text" placeholder="Module No" value={moduleNo} onChange={(e) => setModuleNo(e.target.value)} />
            <input type="text" placeholder="Module Name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} />
            <input type="text" placeholder="PDF Link" value={pdfLink} onChange={(e) => setPdfLink(e.target.value)} />
            <button onClick={addUnit}>Add Unit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingComp;
