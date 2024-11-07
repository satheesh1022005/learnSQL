import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing star icons for revision
import "./Sheet.css"; // Add your custom CSS
import leetcode from "../../assets/leetcode.webp";
const Sheet = () => {
  const [problems, setProblems] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch problems from the API route
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/problem-sets") // Replace with your actual API route
      .then((response) => {
        // Ensure the response data is always an array
        setProblems(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching problems");
        setLoading(false);
      });
  }, []);

  // Mark problem as completed
  const toggleCompleted = (problemId) => {
    setProblems((prevState) =>
      prevState.map((problem) =>
        problem._id === problemId
          ? { ...problem, completionStatus: !problem.completionStatus }
          : problem
      )
    );
    update(problemId, "done");
  };

  // Mark problem for revision
  const toggleRevision = (problemId) => {
    setProblems((prevState) =>
      prevState.map((problem) =>
        problem._id === problemId
          ? { ...problem, revisionMark: !problem.revisionMark }
          : problem
      )
    );
    update(problemId, "revision");
  };
  const update = (problemId, type) => {
    try {
      const response = axios.put(
        `http://localhost:3000/api/update-status?id=${problemId}&type=${type}`
      );

      if (response.status === 200) {
        setProblems((prevState) =>
          prevState.map((problem) =>
            problem._id === problemId
              ? { ...problem, revisionMark: !problem.revisionMark }
              : problem
          )
        );
      }
    } catch (err) {
      console.error("Error toggling revision status", err);
    }
  };
  // Calculate the completion progress
  const getCompletionPercentage = () => {
    if (!Array.isArray(problems)) return 0;

    const totalProblems = problems.length;
    const completedProblems = problems.filter(
      (problem) => problem.completionStatus
    ).length;

    // Avoid division by zero
    if (totalProblems === 0) return 0;

    return (completedProblems / totalProblems) * 100;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="sheet-container">
      <h1 className="sheet-header">SQL Problems</h1>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <span className="progress-label">
          Completion: {completionPercentage.toFixed(2)}%
        </span>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${completionPercentage}%`,
              backgroundColor:
                completionPercentage === 100
                  ? "green"
                  : completionPercentage >= 50
                  ? "yellow"
                  : "red",
            }}
          >
            <span className="progress-text">
              {completionPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="problem-table">
          <thead>
            <tr>
              <th>Problem Name</th>
              <th>Difficulty</th>
              <th>Topic</th>
              <th>Link</th>
              <th>Done</th>
              <th>Revision</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.title}>
                <td>{problem.title}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.topic}</td>
                <td>
                  <a
                    href={problem.psLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={leetcode}
                      alt="leetcode"
                      width="25px"
                      height="25px"
                    />
                  </a>
                </td>
                <td>
                  {/* Checkbox for completion */}
                  <input
                    type="checkbox"
                    checked={problem.completionStatus}
                    onChange={() => toggleCompleted(problem._id)}
                    className="checkbox-btn"
                  />
                </td>
                <td>
                  {/* Star icon for revision */}
                  <span
                    onClick={() => toggleRevision(problem._id)}
                    style={{ cursor: "pointer" }}
                    className={
                      problem.revisionMark
                        ? "revision-mark active"
                        : "revision-mark"
                    }
                  >
                    {problem.revisionMark ? <FaStar /> : <FaRegStar />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sheet;
