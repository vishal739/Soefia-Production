import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./chartviewer.scss";
import { FaBolt } from "react-icons/fa";

const ChartViewer = () => {
  return (
    <div className="admin-chartviewer-container">
      <Navbar />
      <div className="admin-chartviewer-main">
        <Sidebar />
        <div className="admin-chartviewer-panel">
          <div className="admin-chartviewer-panel-first">
            <div className="filters">
              <div>
                <label>Select Aggregation Level</label>
                <select>
                  <option>District / All</option>
                </select>
              </div>
              <div>
                <label>Select Metric</label>
                <select>
                  <option>Engagement: Sub</option>
                </select>
              </div>
              <div>
                <label>Report by</label>
                <select>
                  <option>Week</option>
                </select>
              </div>
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
          <div className="dates">
            <b>Start Date :</b>
            <b>Stop Date :</b>
          </div>
          <div className="chrt-analysis">
            [Bar Chart Progression by Period
            (Lesson,weekly,monthly,term)]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartViewer;
