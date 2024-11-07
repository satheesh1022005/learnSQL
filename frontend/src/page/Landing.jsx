import React, { useState } from "react";
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";
import DoubtClarificationBot from "../components/bot/DoubtClarificationBot";
import bot from "../assets/bot.webp";
import Home from "../components/home/Home";
import chat from "../assets/chat.png";
function Landing() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showBot, setShowBot] = useState(false); // State to control bot visibility
  const navigate = useNavigate();
  const toggleBot = () => {
    setShowBot(!showBot);
  };

  return (
    <>
      {user?.role == "student" ? (
        <div className="landing-container">
          <div className="sidebar">
            <div className="logo">
              <span className="logo-icon">&#128204;</span>
            </div>
            <ul>
              <li>
                <Link to="/">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link to="/view">
                  <a>Courses</a>
                </Link>
              </li>
              <li>
                <Link to="/contestList">
                  <a>Contest</a>
                </Link>
              </li>
              <li>
                <Link to="/contestList">
                  <a>Labs</a>
                </Link>
              </li>
              <li>
                <Link to="/nlp2sql">
                  <a>NLP2SQL</a>
                </Link>
              </li>
              <li>
                <Link to="/optimize">
                  <a>query optimization</a>
                </Link>
              </li>
              <li>
                <Link to="/playground">
                  <a>Playground</a>
                </Link>
              </li>
              <li>
                <Link to="/sheet">
                  <a>SQL sheet</a>
                </Link>
              </li>
              <li>
                <Link to="/project">
                  <a>Project</a>
                </Link>
              </li>
              <li>
                <Link to="/AIinterview">
                  <a>Interview AI</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="main">
            <div className="header">
              <input type="text" placeholder="Search" />
              <div className="header-right">
                <a href="#">
                  <i className="fas fa-bell"></i>
                </a>
                <a href="#">
                  <i className="fas fa-shopping-cart"></i>
                </a>
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle">
                    {user.name} <i className="fas fa-angle-down"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="dashboard">
                <div className="dashboard-title">
                  <div className="title-text">Dashboard</div>
                  <div className="title-time">
                    Last Updated on 04/11/2024 03:30 PM
                  </div>
                </div>
                <div className="user-profile">
                  <div className="user-image"></div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-details">
                      <div>Course: SQL Learning</div>
                    </div>
                  </div>
                </div>
                <div className="stats">
                  <div className="stat-item">
                    <div className="stat-title">Total Courses</div>
                    <div className="stat-value">5</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value">3</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">In Progress</div>
                    <div className="stat-value">2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bot Icon Button */}
          <div className="doubt-icon" onClick={() => navigate("/discussion")}>
            <img src={chat} alt="bot" width="75px" height="75px" />
          </div>
          <div className="bot-icon" onClick={toggleBot}>
            {!showBot && <img src={bot} alt="bot" width="75px" height="75px" />}
          </div>

          {/* Bot Component */}
          {showBot && <DoubtClarificationBot setShowBot={setShowBot} />}
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}

export default Landing;
