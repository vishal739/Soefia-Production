import Navbar from "../Navbar/Navbar";
import "./Classes.scss";
import mic from "../../../assets/mic.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSpeechToText from "../../webSpeech/useSpeechToText";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckUser } from "../../auth/authSlice";
import { Button, ButtonGroup, Switch } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { createClassesAsync, selectClasses, updateClassesAsync } from "../../APILibrary/ClassesAPI/classesSlice";

const Classes = () => {
    const isLoggedIn = useSelector(selectCheckUser);
    const [textInput1, setTextInput1] = useState("");
    const [selectedClass, setSelectedClass] = useState();
    const speechToText1 = useSpeechToText({ continuous: true });
    const userData = isLoggedIn.userData;
    const dispatch= useDispatch();
    const classes=useSelector(selectClasses)
    console.log("classesAsync: ", classes);
    const {
        isListening: isListening1,
        transcript: transcript1,
        startListening: startListening1,
        stopListening: stopListening1,
    } = speechToText1;
    const navigate = useNavigate();

    const startStopListening = (
        isListening,
        textInput,
        setTextInput,
        transcript,
        startListening,
        stopListening
    ) => {
        isListening
            ? stopVoiceInput(textInput, setTextInput, transcript, stopListening)
            : startListening();
    };


    const [filteredData, setFilteredData] = useState([]);
    //   const getClassData = (selectedClassId) => {

    //   };
    const findFilteredData = (selectedClass) => {
        const filteredClass = classes.find(cls => cls._id === selectedClass);

        // Assuming setFilteredData is a state setter function (for example, useState in React)
        if (filteredClass) {
            setFilteredData(filteredClass);
        } else {
            console.error("Class not found.");
        }
    };
    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        // const filtered = classWiseData.filter((item) => {
        //   return  item.classSection === e.target.value;
        // });
        findFilteredData(e.target.value);
    };

    const stopVoiceInput = (
        textInput,
        setTextInput,
        transcript,
        stopListening
    ) => {
        const newText = transcript.length
            ? textInput.length
                ? textInput + " " + transcript
                : transcript
            : textInput;
        setTextInput(newText);
        stopListening();
    };

    const handleCreateLessonClick = () => {
        // Navigate to the lesson page with the selected class as a parameter

        if (selectedClass) {
            navigate(
                `/teacher/lesson?className=${encodeURIComponent(selectedClass)}`
            );
        } else {
            alert("Please select a class before creating a lesson.");
        }
    };
    const handleSubmit= () =>{
        dispatch(updateClassesAsync({_id: selectedClass, whatINeedToKnow: textInput1}))
        setTextInput1("");
        speechToText1.clearTranscript();
    }
    // useEffect(() =>{
    //     dispatch(updateClassesAsync({whatINeedToKnow: textInput1}))
    // })
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="class-header">
                    <section className="header-sec1">
                        <h2>Classes Regular Features</h2>
                        <button>Advanced</button>
                    </section>
                    <section className="header-sec2">
                        <label htmlFor="class-select">Class</label>
                        <select id="class-select" onChange={handleClassChange}>
                            <option value="">Select a class</option>
                            {classes && classes.map((className, index) => (
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
                            value={
                                isListening1
                                    ? textInput1 + (transcript1 ? ` ${transcript1}` : "")
                                    : textInput1
                            }
                            onChange={(e) => {
                                setTextInput1(e.target.value);
                            }}
                        ></textarea>
                        <ButtonGroup
                            variant="outlined"
                            aria-label="Basic button group"
                            className="buttons"
                        >
                            <Button
                                onClick={() =>
                                    startStopListening(
                                        isListening1,
                                        textInput1,
                                        setTextInput1,
                                        transcript1,
                                        startListening1,
                                        stopListening1
                                    )
                                }
                            >
                                {isListening1 ? "Stop Listening" : "Talk to Me"}
                            </Button>
                            <Button onClick={handleSubmit}>Submit</Button>
                            <Button>Upload Files</Button>
                        </ButtonGroup>
                    </div>
                    <div className="right-pane">
                        {/* <Link to="/teacher/lesson" className="right-link"> */}
                            <button className="card" onClick={handleCreateLessonClick}>
                                Create Lesson
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
                <div className="part-2">
                    <section>
                        <div className="heading">
                            <h3>What I Already Know</h3>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
                                <input type="text" placeholder="Search..."></input>
                            </div>
                        </div>
                        <div className="classes-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Topic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {console.log("filterClass: ", filteredData)} */}
                                    {filteredData.whatINeedToKnow && filteredData.whatINeedToKnow.length!=0 ? filteredData.
                                        whatINeedToKnow
                                        .map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    {console.log(item)}
                                                    <td>{item.date}</td>
                                                    <td>{item.topic}</td>
                                                </tr>
                                            );
                                        }) : <tr>
                                        <td>{'----'}</td>
                                        <td>{"----"}</td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section>
                        <div className="heading">
                            <h3>
                                What I Automatically Review <Switch defaultChecked /> On
                            </h3>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
                                <input type="text" placeholder="Search..."></input>
                            </div>
                        </div>
                        <div className="text-area">
                            <textarea
                                className="home-text"
                                placeholder="Things we know"
                            ></textarea>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Classes;
