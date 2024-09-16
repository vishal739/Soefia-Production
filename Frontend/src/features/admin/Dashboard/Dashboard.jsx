import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./dashboard.scss";
import { FaBolt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Navbar />
      <div className="admin-dashboard-main">
        <Sidebar />
        <div className="admin-dashboard-panel">
          <div className="admin-dashboard-panel-first">
            <div className="filters">
              <div>
                <label>Select Aggregation Level</label>
                <select>
                  <option>District / All</option>
                </select>
              </div>
            <b>October 10,2024</b>
            </div>
            <div className="administration">
              <section>
                <FaBolt fontSize={30} color="#3b5998" />
              </section>
              <section>
                <p>Administration Console</p>
                <b>User :</b>
                <b>School :</b>
              </section>
            </div>
          </div>
          <div className="impacts">
            <h2>Impacts</h2>
            <div>
              <section>
                <span>Student Collaborative Learning Minutes Facilitated</span>
                <span>Insights Delivered</span>
                <span>Engagement Subject</span>
                <span>Engagement Collaboration</span>
                <span>Sentiment Balance (+ / -)</span>
                <span>Reported Mood</span>
              </section>
              <hr/>
              <section>
                <span>90,000</span>
                <span>28</span>
                <span>2.6</span>
                <span>3.6</span>
                <span>6:2</span>
                <span>3.1</span>
              </section>
            </div>
          </div>
          <div className="usage">
            <h2>Usage</h2>
              <div>
              <section>
                <span>DeiTAs at Work</span>
                <span>Teachers Assisted</span>
                <span>Students Assisted</span>
                <span>Lessons Facilitated</span>
                <span>Learning Minutes Facilitaed</span>
                <span>StudentsLearning Minutes Facilitaed</span>
              </section>
              <hr/>
              <section>
                <span>4</span>
                <span>4</span>
                <span>103</span>
                <span>144</span>
                <span>3600</span>
                <span>90,000</span>
              </section>
              </div>
        </div></div>
      </div>
    </div>
  )
}

export default Dashboard