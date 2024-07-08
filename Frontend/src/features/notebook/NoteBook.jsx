import React from 'react';
import "./notebook.scss";
import Navbar from '../Navbar/Navbar';
import mic from "../../assets/mic.png";
const NoteBook = () => {
    return (
        <>
            <Navbar />
            <div className="notebook-container">
                <div className="notebook-header">
                    <label htmlFor="class-select">Class</label>
                    <select id="class-select">
                        <option>Algebra I, Block A</option>
                        {/* Add more options here */}
                    </select>
                </div>
                <div className="upper-panel">
                    <div className="left-table">
                        <h2>Lessons to Review [reverse chronology, showing last 8]</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Lesson Goal Summary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>----</td>
                                    <td>----</td>
                                </tr>
                                <tr>
                                    <td>[this lesson is selected]</td>
                                    <td>[this lesson is selected]</td>
                                </tr>
                                <tr>
                                    <td>----</td>
                                    <td>----</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                    <div className="summary-box">
                        <div className="summary">
                            <h2>Summary</h2>
                            <textarea>[Deitas summary of what happened in the class]</textarea>
                        </div>
                        <div className="mic-section">
                            <img className="mic-icon" src={mic} alt="mic" />
                            <button className="mic-btn">Add / Correct</button>
                        </div>
                    </div>
                </div>
                <div className="lower-panel">
                    <div className="left-table">
                        <h2>Select Group to Drill Down</h2>
                        <table>
                            <tbody>
                                <tr><td>----</td></tr>
                                <tr><td>----</td></tr>
                                <tr><td>----</td></tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                    <div className="summary-box">
                        <div className="summary">
                            <h2>From My Perspective</h2>
                            <textarea>[Deita’s synthesis and suggestions, based on what happened in the class]</textarea>
                        </div>
                        <div className="mic-section">
                            <img className="mic-icon" src={mic} alt="mic" />
                            <button className="mic-btn">Add / Correct</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NoteBook;
