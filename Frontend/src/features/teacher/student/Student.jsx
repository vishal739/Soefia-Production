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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { SemiCircleProgress } from "react-semicircle-progressbar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

const Student = () => {
  const students = [
    {
      name: "Alice Johnson",
      age: 15,
      grade: "10th",
      subjects: ["Math", "Science", "English"],
      scores: {
        Math: 85,
        Science: 90,
        English: 88,
      },
    },
    {
      name: "Bob Smith",
      age: 16,
      grade: "11th",
      subjects: ["History", "Math", "Physics"],
      scores: {
        History: 92,
        Math: 78,
        Physics: 85,
      },
    },
    {
      name: "Carol Evans",
      age: 14,
      grade: "9th",
      subjects: ["Biology", "Chemistry", "Math"],
      scores: {
        Biology: 89,
        Chemistry: 91,
        Math: 84,
      },
    },
    {
      name: "Jaylen Brown",
      age: 17,
      grade: "12th",
      subjects: ["English", "Economics", "Math"],
      scores: {
        English: 87,
        Economics: 93,
        Math: 89,
      },
    },
    {
      name: "Emily Clark",
      age: 15,
      grade: "10th",
      subjects: ["Computer Science", "Math", "Art"],
      scores: {
        ComputerScience: 95,
        Math: 82,
        Art: 94,
      },
    },
  ];

  const engagementData = [
    { category: "Subject", percentage: 48, labels: ["Off", "On"] },
    { category: "Collaboration", percentage: 65, labels: ["Low", "High"] },
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

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleDateChange = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };
  return (
    <div className="student-container">
      <Navbar />
      <div className="student-main">
        <div className="st-left-pane">
          <section className="searchbar">
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              spacing={2}
              sx={{ width: 300 }}
              disableClearable
              options={students.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Student Name"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                />
              )}
            />
          </section>
          <div className="st-summary">
            <h2>Social Summary</h2>
            <div className="summary-view">
              <div className="sentiment">
                <h3>Engagement</h3>
                <div className="senti-data">
                  {engagementData.map((item, index) => {
                    return (
                      <div className="progress-bar-container" key={index}>
                        <div className="engagement-category">
                          {item.category}
                        </div>
                        <div className="progress-bar">
                          <CircularProgressbarWithChildren
                            value={item.percentage}
                            strokeWidth={12}
                            circleRatio={0.5}
                            styles={buildStyles({
                              rotation: 0.75,
                              strokeLinecap: "round",
                              strkeWidth: 12,
                              pathTransitionDuration: 0.5,
                              // Colors
                              pathColor: "#3b5998",
                              trailColor: "#d6d6d6",
                            })}
                          >
                            <div className="progress-bar-lebels">
                              <strong>{item.labels[0]}</strong>
                              <strong>{item.labels[1]}</strong>
                            </div>
                            {/* <div
                              style={{
                                fontSize: 14,
                                marginTop: 8,
                                marginLeft: -70,
                              }}
                            >
                              <strong>{item.percentage}%</strong>
                            </div> */}
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sentiment">
                <h3>Sentiment</h3>
                <div className="senti-data">
                  {sentimentData.map((item, index) => {
                    return (
                      <div className="progress-bar-container" key={index}>
                        <div className="progress-bar">
                          <CircularProgressbarWithChildren
                            value={item.percentage}
                            strokeWidth={12}
                            // circleRatio={0.5}
                            styles={buildStyles({
                              rotation: 0.0,
                              strokeLinecap: "round",
                              strkeWidth: 12,
                              pathTransitionDuration: 0.5,
                              // Colors
                              pathColor: "#3b5998",
                              trailColor: "#d6d6d6",
                            })}
                          >
                            <div
                              style={{
                                fontSize: 14,
                                marginTop: -20,
                                marginLeft: 7,
                              }}
                            >
                              <strong>{item.percentage}%</strong>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                        <div className="engagement-category">
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
            {/* <div className="heading"> */}
            <h2>Change Over Time</h2>

            {/* </div> */}
            <div className="filters">
              <section className="class-select">
                <p>Metric : </p>
                <select>
                  <option>Positive Sentiment</option>
                  <option>engagement : subject</option>
                  <option>engagement : collaboration</option>
                  <option>sentiment : positive</option>
                  <option>sentiment : negative</option>
                  {/* Add more options here */}
                </select>
              </section>

              <section className="class-select">
                <p>Report By : </p>
                <select>
                  <option>week</option>
                  {/* Add more options here */}
                </select>
              </section>
              <section className="class-select">
                <p>Date : </p>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  dateFormat="dd MM YYYY"
                  placeholderText="Select Date Range"
                ></DatePicker>
              </section>
            </div>
            <div className="change-data">
              {changesData.map((item, index) => {
                return (
                  <div key={index} className="change-data-item">
                    <div className="bar-container">
                      <span style={{ height: `${item.percentage}%` }}></span>
                    </div>
                    <div className="changer-category">{item.overthedate}</div>
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
              <textarea>
                Jaylen participates actively in class and is encouraging to his
                fellow classmate, bringing a positive attitude and energy. He is
                always willing to take a shot and try something new. 
                His progression during the term has been consistent. While he had
                some difficulty initially in understanding factoring and
                
              </textarea>
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
