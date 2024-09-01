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

import "./LiveLesson.scss";

import { getGroupData } from "./data";
// import LiveLesson from "../livelesson/LiveLesson";

const LiveLesson = () => {
  // groups={}
  // const progressData = [
  //     { category: 'Academic', percentage: 48 },
  //     { category: 'Social', percentage: 65 }
  // ];
  // const sentimentData = [
  //     { category: 'Positive', percentage: 50 },
  //     { category: 'Negative', percentage: 25 }
  // ];
  const groups = getGroupData();
  console.log(groups);
  return (
    <div className="live-lession-container">
      <Navbar />
      <div className="live-lession-main">
        <div className="live-lession-buttons">
          <button className="live-less-button">Pause Live Lession</button>
          <button className="live-less-button">Stop Live Lession</button>
        </div>
        <div className="chart-container">
          {groups &&
            groups.map((group, index) => (
              <div className="chart-box" key={index}>
                <p className="group-name">Group {index + 1}</p>
                <p className="working-name">
                  Working: {"  "}
                  <span className="problem-no">{`Problem: ${index + 1}`}</span>
                </p>
                <div className="barchart">
                  <div className="progress">
                    <h3>Progress</h3>
                    <div className="progress-data">
                      {group.progressData.map((item, index) => {
                        return (
                          <div key={index} className="progress-data-item">
                            <span>{item.percentage}%</span>
                            <div className="bar-container">
                              <span
                                style={{ height: `${item.percentage}%` }}
                              ></span>
                            </div>
                            <div className="progress-category">
                              {item.category}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sentiment">
                    <h3>Sentiment</h3>
                    <div className="senti-data">
                      {group.sentimentData.map((item, index) => {
                        return (
                          <div key={index} className="senti-data-item">
                            <span>{item.percentage}%</span>
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default LiveLesson;
