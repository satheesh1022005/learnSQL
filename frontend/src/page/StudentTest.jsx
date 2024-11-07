import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";

import "./StudentTest.css";
import axios from "axios";

function StudentTest() {
  const [challenges, setChallenge] = useState();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchContests = async () => {
      try {
        console.log(id);
        const value = await axios.get(
          `http://localhost:3000/api/getChallenge/${id}`
        );
        console.log(value);
        setChallenge(value.data.challenges);
        console.log(value.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);
  return (
    <div className="app">
      <Sidebar value={challenges} />
      <Editor value={challenges} />
    </div>
  );
}

export default StudentTest;
