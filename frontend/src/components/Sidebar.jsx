import React from "react";
import "./Sidebar.css";

function Sidebar({ value }) {
  console.log(value);
  const table = value?.attributes?.split(",");
  return (
    <>
      {value && (
        <div className="s-sidebar">
          <h2>SQL Schema</h2>

          {/* Question Name Section */}
          <div className="s-question-name">
            <h3>Question Name</h3>
            <p>{value.question}</p>
          </div>

          {/* Description Section */}
          <div className="s-description">
            <h3>Description</h3>
            <p>{value.description}</p>
          </div>

          {/* Table Section */}
          <div className="s-schema">
            <h3>Table: Customer</h3>
            <table>
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {table?.map((item) => (
                  <tr>
                    <td>{item.trim(" ")}</td>
                    <td>int</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hint Section */}
          <div className="s-hint">
            <h3>Hint</h3>
            <p>{value.hints}</p>
          </div>

          {/* Tags Section */}
          <div className="s-tags">
            <h3>Tags</h3>
            <p>{value.tags}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
