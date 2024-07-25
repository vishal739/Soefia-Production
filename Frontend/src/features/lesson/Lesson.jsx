import "./Lesson.scss"
import Navbar from "../Navbar/Navbar"
import mic from "../../assets/mic.png";
import { Link } from "react-router-dom";
const Lesson = () => {
  return (
    <div className="less-box">
      <div className="navbar"><Navbar /></div>
      <div className="lesson-container">
        <div className="lesson-title">
          <h3>Creating Lesson</h3>
        </div>
        <div className="lesson-panel">
          <div className="left-panel">
            <div className="left-upper">
              <div className="input-container">
                <div className="input-box">
                  <h5>What I Need to Know for This Lesson (Lesson Materials)</h5>
                  <textarea className="textarea" placeholder="Enter Class Details"></textarea>
                  <div className="lesson-btn">
                    <button>Talk to Me</button>
                    <button>Add URL</button>
                    <button>Upload Files</button>
                  </div>
                </div>
                <div className="mic-box">
                <img className="mic-icon" src={mic} alt="mic-icon" />
                  <button className="mic-btn">
                    Tell me
                  </button>
                </div>
              </div>
            </div>
            <div className="left-mid">
              <div className="input-container">
                <div className="input-box">
                  <h5>What Our Lesson Goals (Academic, Social) Are</h5>
                  <textarea className="textarea" placeholder="Enter Class Details"></textarea>
                  <div className="lesson-btn">
                    <button>Talk to Me</button>
                    <button>Add URL</button>
                    <button>Upload Files</button>
                  </div>
                </div>
                <div className="mic-box">
                <img className="mic-icon" src={mic} alt="mic-icon" />
                  <button className="mic-btn">
                    Tell me
                  </button>
                </div>
              </div>
            </div>
            <div className="left-bottom">
              <div className="input-container">
                <div className="input-box">
                  <h5>What Our Collaborative Exercise Is</h5>
                  <textarea className="textarea" placeholder="Enter Class Details"></textarea>
                  <div className="lesson-btn">
                    <button>Talk to Me</button>
                    <button>Add URL</button>
                    <button>Upload Files</button>
                  </div>
                </div>
                <div className="mic-box">
                    <img className="mic-icon" src={mic} alt="mic-icon" />
                  <button className="mic-btn">
                    Tell me
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <div className="right-upper">
            <div className="lesson-card"><Link to="/class">Launch Lesson</Link></div>
            </div>
            <div className="right-mid">
            <div className="lesson-card"><Link to="/class">Preview Lesson</Link></div>
            </div>
            <div className="right-bottom">
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
    </div>
  )
}

export default Lesson