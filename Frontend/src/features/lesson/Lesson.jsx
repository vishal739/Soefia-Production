import "./Lesson.scss";
import Navbar from "../Navbar/Navbar";
import mic from "../../assets/mic.png";
import { Link } from "react-router-dom";
const Lesson = () => {
  return (
    <div className="less-box">
      <Navbar />
      <div className="main">
        <h2>Creating Lesson</h2>
        <div className="part-1">
          <div className="headings">
            <h5>Lesson Structure or Overview</h5>
            <img className="mic-icon" src={mic} alt="failed to load" />
          </div>
          <div className="left-pane">
            <textarea
              className="home-text"
              placeholder="Enter Class Details"
            ></textarea>
            <div className="buttons">
              <button>Talk to Me</button>
              <button>Upload Files</button>
            </div>
          </div>
          <div className="right-pane">
            <button className="card">
              <Link to="/lesson">Preview Lesson</Link>
            </button>
          </div>
          {/* <div className="right-pane">
            <div>
            </div>
            <p>Tell me what I should learn</p>
          </div> */}
        </div>
        <div className="part-2">
          <section>
            <div className="headings">
              <h5>Academic Learning Goal</h5>
              <img className="mic-icon" src={mic} alt="failed to load" />
            </div>
            <div className="left-pane">
              <textarea
                className="home-text"
                placeholder="Enter Class Details"
              ></textarea>
            </div>
            <div className="buttons">
              <button>Talk to Me</button>
              <button>Upload Files</button>
            </div>
          </section>
          <section>
            <div className="headings">
              <h5>Social or Collaboration Learning Goal</h5>
              <img className="mic-icon" src={mic} alt="failed to load" />
            </div>
            <div className="left-pane">
              <textarea
                className="home-text"
                placeholder="Enter Class Details"
              ></textarea>
            </div>
            <div className="buttons">
              <button>Talk to Me</button>
              <button>Upload Files</button>
            </div>
          </section>
        </div>
        <div className="part-3">
          <div className="headings">
            <h5>What Will We Use in This Lesson: Lesson Materials</h5>
            <img className="mic-icon" src={mic} alt="failed to load" />
          </div>
          <div className="left-pane">
            <textarea
              className="home-text"
              placeholder="Enter Class Details"
            ></textarea>
          </div>
          <div className="buttons">
            <button>Talk to Me</button>
            <button>Add URL</button>
            <button>Upload Files</button>
          </div>
        </div>
        <div className="part-4">
          <div>
            <div className="headings">
              <h5>Lesson Excercise: Our Collaboration Exercise</h5>
              <img className="mic-icon" src={mic} alt="failed to load" />
            </div>
            <div className="left-pane">
              <textarea
                className="home-text"
                placeholder="Enter Class Details"
              ></textarea>
            </div>
            <div className="buttons">
              <button>Talk to Me</button>
              <button>Add URL</button>
              <button>Upload Files</button>
            </div>
          </div>
          <div className="excercise-options">
            <div className="select">
              <label>Type of Exercise</label>
              <select name="Type" id="">
                <option>Group Problem Solving</option>
              </select>
            </div>
            <div className="select">
              <label>Type of Exercise</label>
              <select name="group-count" id="">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
