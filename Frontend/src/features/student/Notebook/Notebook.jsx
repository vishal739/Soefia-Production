import React from "react";
import "./Notebook.scss";
import Navbar from "../Navbar/Navbar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUserCircle, FaMicrophone } from "react-icons/fa";

const Notebook = () => {
  const progressData = [
    { category: "Academic", percentage: 48 },
    { category: "Social", percentage: 65 },
  ];
  const sentimentData = [
    { category: "Positive", percentage: 60 },
    { category: "Negative", percentage: 30 },
  ];
  return (
    <div className="st-notebook">
      <Navbar />
      <div className="st-notebook-main">
        <div className="st-nb-leftpane">
          <span className="lesson-displayed">
            <b>Lesson Displayed</b>
            <span className="st-input-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
              <input type="text" placeholder="Search..."></input>
            </span>
            <div>
              <span>10/28/24</span>
              <span>Graph and determine key features of .....</span>
            </div>
          </span>
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
          <div className="learnedBefore">
            <label>
              <b>What Was Learned</b>
            </label>
            <textarea name="learned" id="">
              We learned: Absolute Value Function = a function that contains an
              algebric expression within aboulute value symbols, creating "V" -
              shaped graph. Parent Function = most basic or simplest form of
              function within a family of functions, meaning not been
              transformed at all. For absolute value functions, is the
            </textarea>
          </div>
        </div>
        <div className="st-nb-rightpane">
          <div className="student-info">
            <span className="photo">
              <FaUserCircle fontSize={85} color="#3b5998" />
            </span>
            <div className="details">
              <p>
                <b>Date : </b> October 29,2024
              </p>
              <p>
                <b>School :</b> Boston Garden
              </p>
              <p>
                <b>Student :</b> Jaylen Brown
              </p>
            </div>
            <button>
              <FaMicrophone className="search" />
              Say Something
            </button>
          </div>
          <div className="students">
            <label htmlFor="">
              <b>Students in Group</b>
            </label>
            <div className="students-content">
              <ul>
                <li>Jaylen Brown</li>
                <li>Jaylen Brown</li>
                <li>Jaylen Brown</li>
                <li>Jaylen Brown</li>
                <li>----</li>
              </ul>
              <div className="feedback">
                <p>Submit unshared feedback on group to your teacher</p>
                <button>Feedback</button>
                <button>Submit how you feel right now</button>
              </div>
            </div>
          </div>
          <div className="grp-ex-summary">
            <label>
              <b>Group Excercise Summary</b>
            </label>
            <textarea name="grp-ex-summary" id=""></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
