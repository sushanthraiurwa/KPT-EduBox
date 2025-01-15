import React, { useState } from "react";
import axios from "axios";
import "./QuestionPapersLogin.css";

const QuestionPapersLogin = () => {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [questionPapers, setQuestionPapers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newQuestionPaper, setNewQuestionPaper] = useState({
    branch: "",
    sem: "",
    subjectName: "",
    cie1: "",
    cie2: "",
    cie3: "",
    see: "",
    year: "",
  });

  const fetchQuestionPapers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/questionpapers", {
        params: { branch, sem: semester, year },
      });
      setQuestionPapers(response.data);
      setIsDataFetched(true);
      setShowAddForm(true);
    } catch (error) {
      console.error("Error fetching question papers:", error);
      setErrorMessage("Failed to fetch question papers. Please try again.");
      setIsDataFetched(false);
    }
  };

  const handleAddQuestionPaper = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/questionpapers", {
        ...newQuestionPaper,
        branch,
        sem: semester,
        year,
      });
      setQuestionPapers([...questionPapers, response.data]);
      setNewQuestionPaper({
        branch: "",
        sem: "",
        subjectName: "",
        cie1: "",
        cie2: "",
        cie3: "",
        see: "",
        year: "",
      });
      alert("Question paper added successfully!");
    } catch (error) {
      console.error("Error adding question paper:", error);
      setErrorMessage("Failed to add question paper. Please try again.");
    }
  };

  const handleDeleteQuestionPaper = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/questionpapers/${id}`);
      setQuestionPapers(questionPapers.filter((qp) => qp.id !== id));
      alert("Question paper deleted successfully!");
    } catch (error) {
      console.error("Error deleting question paper:", error);
      setErrorMessage("Failed to delete question paper. Please try again.");
    }
  };

  const handleShowData = () => {
    if (!branch || !semester || !year) {
      setErrorMessage("Please select Branch, Semester, and Year to continue.");
      setIsDataFetched(false);
      setShowAddForm(false);
    } else {
      setErrorMessage("");
      fetchQuestionPapers();
    }
  };

  return (
    <div className="qp-unique-container">
      
<h1 className="question-heading">QUESTION PAPER</h1>

      <div className="admin-panel">ADMIN PAGE</div>

      <div className="qp-unique-branch-container">
        <h1 className="qp-unique-branch-title">Select 1 Branch</h1>
        <div className="qp-unique-branch-buttons">
          {["CS", "EC", "EEE", "CE", "AT", "CH", "ME", "PO"].map((branchOption) => (
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
          {["Sem1", "Sem2", "Sem3", "Sem4", "Sem5"].map((sem) => (
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
          {["2023", "2024"].map((yr) => (
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

      {errorMessage && <div className="qp-error-message">{errorMessage}</div>}

      {isDataFetched && (
        <div className="qp-app__container">
          <h1 className="qp-app__title">Question Paper Management</h1>
          <table className="qp-table__container">
            <thead>
              <tr>
                <th className="qp-table__heading">Branch</th>
                <th className="qp-table__heading">Subject Name</th>
                <th className="qp-table__heading">CIE 1</th>
                <th className="qp-table__heading">CIE 2</th>
                <th className="qp-table__heading">CIE 3</th>
                <th className="qp-table__heading">SEE</th>
                <th className="qp-table__heading">Actions</th>
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
                    <td className="qp-table__data">
                      <button
                        className="qp-table__delete-btn"
                        onClick={() => handleDeleteQuestionPaper(qp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="qp-table__data">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddForm && (
        <div className="qp-add-paper-container">
          <h2 className="qp-add-title">Add New Question Paper</h2>
          <form className="qp-add-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" value={branch} disabled placeholder="Branch" className="qp-add-input" />
            <input type="text" value={semester} disabled placeholder="Semester" className="qp-add-input" />
            <input type="text" value={year} disabled placeholder="Year" className="qp-add-input" />
            <input
              type="text"
              placeholder="Subject Name"
              value={newQuestionPaper.subjectName}
              onChange={(e) =>
                setNewQuestionPaper({ ...newQuestionPaper, subjectName: e.target.value })
              }
              className="qp-add-input"
            />
            <input
              type="text"
              placeholder="CIE 1 Link"
              value={newQuestionPaper.cie1}
              onChange={(e) => setNewQuestionPaper({ ...newQuestionPaper, cie1: e.target.value })}
              className="qp-add-input"
            />
            <input
              type="text"
              placeholder="CIE 2 Link"
              value={newQuestionPaper.cie2}
              onChange={(e) => setNewQuestionPaper({ ...newQuestionPaper, cie2: e.target.value })}
              className="qp-add-input"
            />
            <input
              type="text"
              placeholder="CIE 3 Link"
              value={newQuestionPaper.cie3}
              onChange={(e) => setNewQuestionPaper({ ...newQuestionPaper, cie3: e.target.value })}
              className="qp-add-input"
            />
            <input
              type="text"
              placeholder="SEE Link"
              value={newQuestionPaper.see}
              onChange={(e) => setNewQuestionPaper({ ...newQuestionPaper, see: e.target.value })}
              className="qp-add-input"
            />
            <button onClick={handleAddQuestionPaper} className="qp-add-btn">
              Add Question Paper
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuestionPapersLogin;
