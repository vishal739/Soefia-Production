import Navbar from "../Navbar/Navbar";
import "./Classes.scss";
import mic from "../../assets/mic.png";
import { Link } from "react-router-dom";
const Classes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="class-header">
                    <section className="header-sec1">
                        <h2>Regular Features</h2>
                        <button>Advanced</button>
                    </section>
                    <section className="header-sec2">
                        <label htmlFor="class-select">Class</label>
                        <select id="class-select">
                            <option>Algebra I, Block A</option>
                            {/* Add more options here */}
                        </select>
                    </section>
                </div>
                <div className="part-1">
                    <div className="headings">
                        <h5>What I Need to Know for This Class</h5>
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
                    {/* <div className="right-pane">
            <button className="card">
              <Link to="/lesson">Create Lesson</Link>
            </button>
            
          </div> */}
                    <div className="right-pane">
                        <Link to="/lesson" className="right-link"> <button className="card">
                            Create Lesson
                        </button></Link>
                    </div>
                    {/* <div className="right-pane">
            <div>
            </div>
            <p>Tell me what I should learn</p>
          </div> */}
                </div>
                <div className="part-2">
                    <div className="search-box1">
                        <h3>What I Already Know</h3>
                        <div className="search-container">
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="text-area1">
                        <textarea
                            className="home-text"
                            placeholder="Things we know"
                        ></textarea>
                    </div>
                    <div className="search-box2">
                        <h3>What I Automatically Review</h3>
                        <div className="search-container">
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="text-area2">
                        <textarea
                            className="home-text"
                            placeholder="Things we know"
                        ></textarea>
                    </div>
                    <div className="radio-buttons">
                        <label>
                            <input type="radio" name="filter" checked />
                            By item
                        </label>
                        <label>
                            <input type="radio" name="filter" />
                            By topic
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Classes;
