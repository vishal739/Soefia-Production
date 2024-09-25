import Navbar from "../Navbar/Navbar";
import "./Classes.scss";
import mic from "../../../assets/mic.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSpeechToText from "../../webSpeech/useSpeechToText";
import { useSelector } from "react-redux";
import { selectCheckUser } from "../../auth/authSlice";
const Classes = () => {
    const isLoggedIn = useSelector(selectCheckUser);
    const [textInput1, setTextInput1] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const speechToText1 = useSpeechToText({ continuous: true });
    const userData = isLoggedIn.userData;
    const { isListening: isListening1, transcript: transcript1, startListening: startListening1, stopListening: stopListening1 } = speechToText1;
    const navigate= useNavigate();

    const startStopListening = (isListening, textInput, setTextInput, transcript, startListening, stopListening) => {
        isListening ? stopVoiceInput(textInput, setTextInput, transcript, stopListening) : startListening();
    };

    const stopVoiceInput = (textInput, setTextInput, transcript, stopListening) => {
        const newText = transcript.length ? (textInput.length ? textInput + ' ' + transcript : transcript) : textInput;
        setTextInput(newText);
        stopListening();
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleCreateLessonClick = () => {
        // Navigate to the lesson page with the selected class as a parameter
        
        if (selectedClass) {
            navigate(`/teacher/lesson?className=${encodeURIComponent(selectedClass)}`);
        } else {
            alert("Please select a class before creating a lesson.");
        }
    };
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
                        <select id="class-select" onChange={handleClassChange}>
                            <option value="">Select a class</option>
                            {userData.classes &&  userData.classes.map((className, index) => (
                                <option key={index} value={className._id}> {className.name} </option>
                            ))}

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
                            disabled={isListening1}
                            value={isListening1 ? textInput1 + (transcript1 ? ` ${transcript1}` : '') : textInput1}
                            onChange={(e) => {
                                setTextInput1(e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="buttons">
                        <button
                            onClick={() => startStopListening(isListening1, textInput1, setTextInput1, transcript1, startListening1, stopListening1)}
                        >
                            {isListening1 ? 'Stop Listening' : 'Talk to Me'}
                        </button>
                        <button>Add URL</button>
                        <button>Upload Files</button>
                    </div>
                    {/* <div className="right-pane">
            <button className="card">
              <Link to="/lesson">Create Lesson</Link>
            </button>
            
          </div> */}
                    <div className="right-pane">
                        <Link to="/teacher/groups" className="right-link"> <button className="card">
                            Groups
                        </button></Link>
                        {/* <Link to="/teacher/lesson" className="right-link"> */}
                        <button className="card" onClick={handleCreateLessonClick}>
                            Create Lesson
                        </button>
                        {/* </Link> */}
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
