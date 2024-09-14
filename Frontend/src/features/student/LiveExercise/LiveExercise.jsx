import React from "react";
import "./LiveExercise.scss";
import Navbar from "../Navbar/Navbar";
import { FaPauseCircle, FaUserCircle } from "react-icons/fa";
import mic from "../../../assets/mic.png";

const LiveExercise = () => {
  return (
    <div className="st-livexcercise">
      <Navbar />
      <div className="st-liveex-main">
        <div className="first">
          <button>Exit Live Lesson</button>
          <section className="pause">
            <b>Pause Soefia for 15 seconds</b>
            <FaPauseCircle fontSize={30} color="#3b5998" />
          </section>
          <section className="remainingtime">
            <label>Time Remaining</label>
            <span>00:15:59</span>
          </section>
        </div>
        <div className="second">
          <section>
            <label>Our Current Collaborative Exercise</label>
            <textarea name="current-collab">
              Each group is working on simplifying one of the six absolute value
              functions and in graphing that function. When a group has
              completed its work, it will post that work on the provided posting
              sheet and then review the posted sheets of the other groups, to
              review and understand the solutions to all six functions. After
              this, we will review
            </textarea>
          </section>
          <span>
            <FaUserCircle fontSize={45} color="#3b5998" />
          </span>
        </div>
        <div className="third">
          <section>
            <h1>Group 3</h1>
            <div>
              <label htmlFor="">Progress Scroll</label>
              <button>Report</button>
              <img className="mic-icon" src={mic} alt="failed to load" />
            </div>
            <textarea name="" id="">
              We completed problem 2. It was sort of hard to understand. That
              graphing part was confusing, but we figured it out. We have
              completed problem 1. It was pretty easy.
            </textarea>
          </section>
          <textarea name="" id="course-information">
            [area in which Deita would display any information from course
            curriculum to scaffold learning]
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default LiveExercise;
