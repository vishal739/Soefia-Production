import React from "react";
import "./notebook.scss";
import Navbar from "../Navbar/Navbar";
import mic from "../../../assets/mic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const progressData = [
  { category: "Academic", percentage: 48 },
  { category: "Social", percentage: 65 },
];
const sentimentData = [
  { category: "Positive", percentage: 50 },
  { category: "Negative", percentage: 25 },
];

const NoteBook = () => {
  return (
    <div className="notebook-container">
      <Navbar />
      <div className="notebook-main">
        <div className="nbook-left-pane">
          <div className="nb-header">
            <label htmlFor="review">Lessons to Review</label>
            <div className="search-container">
              {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="search" /> */}
              <input type="text" placeholder="Search..."></input>
            </div>
          </div>
          <table className="nb-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Lesson Goal Summary</th>
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
          <div className="nb-summary">
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
                          <span style={{ height: `${item.percentage}%` }}></span>
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
        </div>
        <div className="nbook-right-pane">
          <section className="class-select">
            <label htmlFor="class-select">Class</label>
            <select>
              <option>Algebra I, Block A</option>
              {/* Add more options here */}
            </select>
          </section>
          <section>
            <div className="headings">
              <img className="mic-icon" src={mic} alt="failed to load" />
              <h3>Summary Observation: Our Achievements So Far</h3>
            </div>
            <div>
              <textarea className="nb-text-area"></textarea>
            </div>
          </section>
          <section>
            <div className="headings">
              <img className="mic-icon" src={mic} alt="failed to load" />
              <h3>Review: Insights and Possible Actions</h3>
            </div>
            <div>
              <textarea className="nb-text-area"></textarea>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NoteBook;
