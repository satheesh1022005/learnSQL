import React, { useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import "./Editor.css";

function Editor({ value }) {
  const [query, setQuery] = useState("");
  const [isEqual, setIsEqual] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  console.log(value);
  const handleSubmit = async () => {
    setData([]);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/check-output/${value._id}`,
        { sqlQuery: query } // Send SQL query in request body
      );

      const { isEqual, results } = response.data;
      setIsEqual(isEqual);

      if (results && results.length > 0) {
        const columns = Object.keys(results[0]).map((key) => ({
          Header: key.charAt(0).toUpperCase() + key.slice(1),
          accessor: key,
        }));
        setColumns(columns);
        setData(results);
      } else {
        setColumns([]);
        setData([]);
      }
    } catch (error) {
      console.error("Error executing query:", error);
      setIsEqual(false);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="editor">
      <div className="editor-header">
        <h1>SQL COMPILER</h1>
      </div>
      <div className="query-container">
        <textarea
          placeholder="Write your SQL query statement below"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        ></textarea>
      </div>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={handleSubmit}
      >
        Execute
      </button>
      <div className="result-message">
        {isEqual !== null && (
          <p style={{ color: isEqual ? "green" : "red" }}>
            {isEqual ? "Success" : "Failure"}
          </p>
        )}
      </div>
      <div className="table-container">
        <h2>OUTPUT</h2>
        {data.length > 0 ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No results to display</p>
        )}
      </div>
    </div>
  );
}

export default Editor;
