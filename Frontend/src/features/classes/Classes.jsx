import Navbar from "../Navbar/Navbar"
import "./Classes.scss"
import mic from "../../assets/mic.png"
import { Link } from "react-router-dom"
const Classes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="class-header">
                    <label htmlFor="class-select">Class</label>
                    <select id="class-select">
                        <option>Algebra I, Block A</option>
                        {/* Add more options here */}
                    </select>
                </div>
                <div className="section">
                    <div className="left-pane">
                        <div className="headings">
                            <h2>Regular Features</h2>
                            <h5>What I Need to Know for This Class</h5>
                        </div>
                        <textarea className="home-text" placeholder="Enter Class Details"></textarea>
                        <div className="buttons">
                            <button>Talk to Me</button>
                            <button>Add URL</button>
                            <button>Upload Files</button>
                        </div>
                    </div>
                    <div className="center-pane">
                        <Link to="/lesson"><button className="card">Create Lesson</button></Link>
                    </div>
                    <div className="right-pane">
                        <div >
                            <img className="mic-icon" src={mic} alt="failed to load" />
                        </div>
                        <p>Tell me what I should learn</p>
                    </div>
                </div>
                <div className="section-2">
                    <div className="search-box">
                        <h3>What I Already Know</h3>
                        <div className="search-container">
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="text-area">
                        <textarea className="home-text" placeholder="Things we know"></textarea>
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
    )
}

export default Classes