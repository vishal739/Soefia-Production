import React from "react";
import "./mydeita.scss";
import Navbar from "../Navbar/Navbar";
import mic from "../../../assets/mic.png";
import { FaUserCircle } from "react-icons/fa";

const Mydeita = () => {
  return (
    <div className="mydeita-container">
      <Navbar />
      <div className="mydeita-main">
        <section>
          <div className="headings">
            <p>Teacher Expectations for DeiTA</p>
            <img className="mic-icon" src={mic} alt="failed to load" />
          </div>
          <div>
            <textarea
              className="mydeita-text-area"
              //   disabled={isListening4}
              //   value={isListening4 ? textInput4 + (transcript4 ? ` ${transcript4}` : '') : textInput4}
              //   onChange={(e) => { setTextInput4(e.target.value) }}
            ></textarea>
            <div className="buttons">
              <button
              // onClick={() => startStopListening(isListening4, textInput4, setTextInput4, transcript4, startListening4, stopListening4)}
              >
                Talk to Me
                {/* {isListening4 ? 'Stop Listening' : 'Talk to Me'} */}
              </button>
              <button>Add URL</button>
              <button>Upload Files</button>
            </div>
          </div>
        </section>
        <h2>Preferences</h2>
        <section className="mydeita-preferences">
          <div className="mydeita-group-filters">
            <h3>Groups</h3>
            <section>
              <label>Formation</label>
              <select>
                <option> Alphabetic </option>
              </select>
            </section>

            <section>
              <label> Naming </label>
              <select>
                <option>By Number</option>
              </select>
            </section>

            <section>
              <label> Go Away </label>
              <select>
                <option>1</option>
              </select>
            </section>
          </div>

          <div className="mydeita-roles">
            <p>Roles</p>
            <ul>
              <li>Recordkeeper</li> <li>Facilitator</li>
              <li>Timekeeper</li>
              <li>-----</li>
              <li>-----</li>
            </ul>
          </div>

          <div className="mydeita-infos">
            <div>
              <h3>DeiTA</h3>
              <section>
                <label>Accent</label>
                <select>
                  <option> US-Southern </option>
                </select>
              </section>

              <section>
                <label> Stylized Age </label>
                <select>
                  <option>28</option>
                </select>
              </section>

              <section>
                <label> Sex </label>
                <select>
                  <option>Female</option> <option>Male</option>
                </select>
              </section>
            </div>

            <div className="mydeita-infos-second-container">
              <section>
                <FaUserCircle fontSize={50} color="#3b5998" />
                <div>
                  <a>Try Again</a> <button>Save</button>
                </div>
              </section>
              <section>
                <div className="headings">
                  <p>Describe Me</p>
                  <img className="mic-icon" src={mic} alt="failed to load" />
                </div>
                <div>
                  <textarea
                    className="mydeita-text-area"
                    //   disabled={isListening4}
                    //   value={isListening4 ? textInput4 + (transcript4 ? ` ${transcript4}` : '') : textInput4}
                    //   onChange={(e) => { setTextInput4(e.target.value) }}
                  ></textarea>
                  <div className="buttons">
                    <button
                    // onClick={() => startStopListening(isListening4, textInput4, setTextInput4, transcript4, startListening4, stopListening4)}
                    >
                      Talk to Me
                      {/* {isListening4 ? 'Stop Listening' : 'Talk to Me'} */}
                    </button>
                    <button>Upload Images</button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Mydeita;
