import React, { useState } from 'react';
import axios from 'axios';
import './NotesLogin.css';

const NotesLogin = () => {
  const [branch, setBranch] = useState(""); // Branch state
  const [semester, setSemester] = useState(""); // Semester state
  const [subjects, setSubjects] = useState([]); // Fetched subjects
  const [modules, setModules] = useState([]); // Modules for a subject
  const [selectedSubject, setSelectedSubject] = useState(null); // Selected subject
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [isDataFetched, setIsDataFetched] = useState(false); // Subject fetch status
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility

  // For Add Unit form
  const [moduleNo, setModuleNo] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  // For Add Subject form
  const [newSubject, setNewSubject] = useState({
    branch: '',
    semester: '',
    subject: ''
  });

  const [isAddSubjectVisible, setIsAddSubjectVisible] = useState(false); // Controls visibility of Add Subject form

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

  // Fetch modules based on branch, semester, and subject
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

  // Add Subject
  // Add Subject
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/subjects", newSubject);
      setSubjects([...subjects, response.data]); // Update subjects list
      setNewSubject({
        branch: branch, // Set branch from the selected state
        semester: semester, // Set semester from the selected state
        subject: '' // Reset subject input
      });
      setErrorMessage(""); // Clear error message
      // Optionally keep the form open after adding the subject:
      setIsAddSubjectVisible(true);
    } catch (error) {
      console.error("Error adding subject:", error);
      setErrorMessage("Failed to add subject. Please try again.");
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

  const handleShowSubjects = () => {
    if (!branch || !semester) {
      setErrorMessage("Please select Branch and Semester to continue.");
      setIsDataFetched(false);
    } else {
      fetchSubjects();
      setIsAddSubjectVisible(true); // Show Add Subject form after subjects are fetched
    }
  };

  const handleMoreClick = (subject) => {
    if (selectedSubject === subject) {
      // Toggle visibility if the same subject is clicked again
      setDropdownVisible(!dropdownVisible);
    } else {
      setSelectedSubject(subject);
      setDropdownVisible(true); // Show dropdown when a new subject is clicked
      fetchModules(subject.subject); // Use 'subject.subject' to fetch modules
    }
  };

  return (
    <div className="note-container">
     <div className="notes-admin-panel">
      <div className="notes-admin-box">
        <h1 className="notes-admin-heading">NOTES ADMIN PAGE</h1>
      </div>
    </div>

      <div className="branch-container">
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
    <h2>Add Subject</h2>
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
        value={branch} // Ensure branch is set here
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
  );
};

export default NotesLogin;
