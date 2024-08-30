import Navbar from "../Navbar/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./Student.scss";
import LiveLesson from "../livelesson/LiveLesson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import LiveLesson from "../livelesson/LiveLesson";



const Student = () => {
  const progressData = [
    { category: "Academic", percentage: 48 },
    { category: "Social", percentage: 65 },
  ];
  const sentimentData = [
    { category: "Positive", percentage: 50 },
    { category: "Negative", percentage: 25 },
  ];
  const changesData = [
    { overthedate: "10/4", percentage: 28 },
    { overthedate: "10/6", percentage: 35 },
    { overthedate: "10/11", percentage: 37 },
    { overthedate: "10/13", percentage: 45 },
    { overthedate: "10/18", percentage: 60 },
    { overthedate: "10/20", percentage: 62 },
  ];
  return (
    <div className="student-container">
      <Navbar />
      <div className="student-main">
        <div className="st-left-pane">
          <section className="searchbar">
            <div className="search-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
              <input type="text" placeholder="Jaylen Brown"></input>
            </div>
            <span>Student Name</span>
          </section>
          <div className="st-summary">
            <h2>Social Summary</h2>
            <div className="summary-view">
              <div className="engagement">
                <h3>Engagement</h3>
                {progressData.map((item, index) => {
                  return (
                    <div className="progress-bar-container" key={index}>
                      <div className="progress-bar">
                        <span
                          className="progress-percentage"
                          style={{ width: `${item.percentage}%` }}
                        ></span>
                      </div>
                      <div className="engagement-category">{item.category}</div>
                    </div>
                  );
                })}
              </div>
              <div className="sentiment">
                <h3>Sentiment</h3>
                <div className="senti-data">
                  {sentimentData.map((item, index) => {
                    return (
                      <div key={index} className="senti-data-item">
                        <div className="bar-container">
                          <span
                            style={{ height: `${item.percentage}%` }}
                          ></span>
                        </div>
                        <div className="sentiment-category">
                          {item.category}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="changes">
            <div className="heading">
              <h2>Change Over Time</h2>
              <section className="class-select">
                <select>
                  <option>Positive Sentiment</option>
                  <option>Negative Sentiment</option>
                  {/* Add more options here */}
                </select>
              </section>
            </div>
            <div className="change-data">
                  {changesData.map((item, index) => {
                    return (
                      <div key={index} className="change-data-item">
                        <div className="bar-container">
                          <span
                            style={{ height: `${item.percentage}%` }}
                          ></span>
                        </div>
                        <div className="changer-category">
                          {item.overthedate}
                        </div>
                      </div>
                    );
                  })}
                </div>
          </div>
        </div>
        <div className="st-right-pane">
          <section>
            <span>"Cut and Paste" Summary of Activity and Assessment</span>
            <div>
              <textarea></textarea>
            </div>
          </section>
          <section>
            <span>
              Lessons to Review [ reverse chronology , showing last 10 ]
            </span>
            <table className="st-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Academic Lesson Goal Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10/28/24</td>
                <td>Graph and determine key features of...</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
              </tr>
              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Student;
