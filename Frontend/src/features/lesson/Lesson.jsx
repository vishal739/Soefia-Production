import "./Lesson.scss";
import Navbar from "../Navbar/Navbar";
import mic from "../../assets/mic.png";
import { Link } from "react-router-dom";

import useSpeechToText from "../webSpeech/useSpeechToText";
import { useEffect, useState } from "react";


const Lesson = () => {
  const [textInput, setTextInput] = useState('')
  const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true })

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening()
  }

  const stopVoiceInput = () => {
    console.log('prevVal: ', textInput)
    console.log('transcript: ', transcript)
    const newText = transcript.length ? (textInput.length ? textInput + ' ' + transcript : transcript) : textInput;
    setTextInput(newText);
    console.log("newText: ", newText)
    console.log('text: ', textInput)
    stopListening()
  }

  useEffect(() => {
    console.log('Updated textInput: ', textInput);
  }, [isListening]);
  // useEffect(() => {
  //   if (!isListening && transcript) {
  //     setTextInput((prevVal) => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
  //   }
  // }, [isListening, transcript]);

  // const startStopListening = () => {
  //   isListening ? stopListening() : startListening();
  // };





  return (
    <div className="less-box">
      <Navbar />
      <div className="main">
        <h2>Creating a Lesson</h2>
        <div className="lesson-container">
          <div className="left-pane">
            <section>
              <div className="headings">
                <h4>Lesson Structure or Overview</h4>
                <img className="mic-icon" src={mic} alt="failed to load" />
              </div>
              <div>
                <textarea
                  className="lesson-text-area"
                  disabled={isListening}
                  value={isListening ? textInput + (transcript ? ` ${transcript}` : '') : textInput}
                  onChange={(e) => { setTextInput(e.target.value) }}
                ></textarea>

                <div className="buttons">
                  <button
                    onClick={() => startStopListening()}
                  >
                    {isListening ? 'Stop Listening' : 'Talk to Me'}
                  </button>
                  <button>Upload Files</button>
                </div>
              </div>
            </section>
            <div className="learning-goal">
              <section className="goal-sec1">
                <div className="headings">
                  <h4>Academic Learning Goal</h4>
                  <img className="mic-icon" src={mic} alt="failed to load" />
                </div>
                <div>
                  <textarea
                    className="lesson-text-area"
                    placeholder="Enter academic goals"
                  ></textarea>
                  <div className="buttons">
                    <button>Talk to Me</button>
                    <button>Upload Files</button>
                  </div>
                </div>
              </section>
              <section>
                <div className="headings">
                  <h4>Social or Collaboration Learning Goal</h4>
                  <img className="mic-icon" src={mic} alt="failed to load" />
                </div>
                <div>
                  <textarea
                    className="lesson-text-area"
                    placeholder="Enter goals"
                  ></textarea>
                  <div className="buttons">
                    <button>Talk to Me</button>
                    <button>Upload Files</button>
                  </div>
                </div>
              </section>
            </div>
            <section>
              <div className="headings">
                <h4>What Will We Use in This Lesson: Lesson Materials</h4>
                <img className="mic-icon" src={mic} alt="failed to load" />
              </div>
              <div>
                <textarea
                  className="lesson-text-area"
                  placeholder="Enter Learning Material Details"
                ></textarea>
                <div className="buttons">
                  <button>Talk to Me</button>
                  <button>Add URL</button>
                  <button>Upload Files</button>
                </div>
              </div>
            </section>
            <section>
              <div className="headings">
                <h4>Lesson Exercise: Our Collaboration Exercise</h4>
                <img className="mic-icon" src={mic} alt="failed to load" />
              </div>
              <div>
                <textarea
                  className="lesson-text-area"
                  placeholder="Enter Exercise Details"
                ></textarea>
                <div className="buttons">
                  <button>Talk to Me</button>
                  <button>Add URL</button>
                  <button>Upload Files</button>
                </div>
              </div>
            </section>
          </div>
          <div className="right-pane">
            <button className="card">
              <Link to="/lesson">Preview Lesson</Link>
            </button>
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
    </div>
  );
};

export default Lesson;
