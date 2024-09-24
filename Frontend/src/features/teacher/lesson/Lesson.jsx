import "./Lesson.scss";
import Navbar from "../Navbar/Navbar";
import mic from "../../../assets/mic.png";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"
import useSpeechToText from "../../webSpeech/useSpeechToText";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Lesson = () => {

  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');
  const [textInput4, setTextInput4] = useState('');
  const [textInput5, setTextInput5] = useState('');
  // const [textInput6, setTextInput6] = useState('');

  const speechToText1 = useSpeechToText({ continuous: true });
  const speechToText2 = useSpeechToText({ continuous: true });
  const speechToText3 = useSpeechToText({ continuous: true });
  const speechToText4 = useSpeechToText({ continuous: true });
  const speechToText5 = useSpeechToText({ continuous: true });
  // const speechToText6 = useSpeechToText({ continuous: true });

  // Then you can access them like this:
  const { isListening: isListening1, transcript: transcript1, startListening: startListening1, stopListening: stopListening1 } = speechToText1;
  const { isListening: isListening2, transcript: transcript2, startListening: startListening2, stopListening: stopListening2 } = speechToText2;
  const { isListening: isListening3, transcript: transcript3, startListening: startListening3, stopListening: stopListening3 } = speechToText3;
  const { isListening: isListening4, transcript: transcript4, startListening: startListening4, stopListening: stopListening4 } = speechToText4;
  const { isListening: isListening5, transcript: transcript5, startListening: startListening5, stopListening: stopListening5 } = speechToText5;
  // const { isListening: isListening6, transcript: transcript6, startListening: startListening6, stopListening: stopListening6 } = speechToText6;

  const startStopListening = (isListening, textInput, setTextInput, transcript, startListening, stopListening) => {
    isListening ? stopVoiceInput(textInput, setTextInput, transcript, stopListening) : startListening();
  };

  const stopVoiceInput = (textInput, setTextInput, transcript, stopListening) => {
    const newText = transcript.length ? (textInput.length ? textInput + ' ' + transcript : transcript) : textInput;
    setTextInput(newText);
    stopListening();
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const className = queryParams.get('className');
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm()

  const onSubmit = () => {

    const lessonData = {
      "classId":  className,
      "LessonStructureOverview": textInput1,
      "learningGoals": textInput2,
      "SocialCollaborationGoal": textInput3,
      "lessonExercise": textInput4,
      "lessonMaterials": textInput5
    }
    console.log("Creating lesson for this data: ", lessonData);
    // dispatch();
    // console.log("signup data: ", data);
  };



  return (
    <div className="less-box">
      <Navbar />
      <div className="main">
        <h2>Creating a Lesson</h2>
        <div className="lesson-container">

          <div className="left-pane">
            {/* <form noValidate
              onSubmit={handleSubmit(onSubmit)}> */}
            <section>

              <div className="headings">
                <h4>Lesson Structure or Overview</h4>
                <img className="mic-icon" src={mic} alt="failed to load" />
              </div>
              <div>
                <textarea
                  // defaultValue=""
                  className="lesson-text-area"
                  disabled={isListening1}
                  value={isListening1 ? textInput1 + (transcript1 ? ` ${transcript1}` : '') : textInput1}
                  onChange={(e) => {
                    setTextInput1(e.target.value);
                  }}
                  id="LessonStructureOverview"
                // {...register("LessonStructureOverview")}

                ></textarea>


                <div className="buttons">
                  <button
                    onClick={() => startStopListening(isListening1, textInput1, setTextInput1, transcript1, startListening1, stopListening1)}
                  >
                    {isListening1 ? 'Stop Listening' : 'Talk to Me'}
                  </button>
                  <button>Upload Files</button>
                </div>
                {/* {errors.LessonStructureOverview && (<p className='error-message'>{errors.LessonStructureOverview.message}</p>)} */}
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
                    disabled={isListening2}
                    // defaultValue=""
                    value={isListening2 ? textInput2 + (transcript2 ? ` ${transcript2}` : '') : textInput2}
                    onChange={(e) => {
                      setTextInput2(e.target.value);
                      setValue("learningGoals", e.target.value);
                    }}
                    id="learningGoals"
                  // {...register("learningGoals")}
                  ></textarea>
                  <div className="buttons">
                    <button
                      onClick={() => startStopListening(isListening2, textInput2, setTextInput2, transcript2, startListening2, stopListening2)}
                    >
                      {isListening2 ? 'Stop Listening' : 'Talk to Me'}
                    </button>
                    <button>Upload Files</button>
                  </div>
                  {/* {errors.learningGoals && (<p className='error-message'>{errors.learningGoals.message}</p>)} */}
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
                    disabled={isListening3}
                    // defaultValue=""
                    value={isListening3 ? textInput3 + (transcript3 ? ` ${transcript3}` : '') : textInput3}
                    onChange={(e) => { setTextInput3(e.target.value) }}
                    id="SocialCollaborationGoal"
                  // {...register("SocialCollaborationGoal")}
                  ></textarea>
                  <div className="buttons">
                    <button
                      onClick={() => startStopListening(isListening3, textInput3, setTextInput3, transcript3, startListening3, stopListening3)}
                    >
                      {isListening3 ? 'Stop Listening' : 'Talk to Me'}
                    </button>
                    <button>Upload Files</button>
                  </div>
                  {/* {errors.SocialCollaborationGoal && (<p className='error-message'>{errors.SocialCollaborationGoal.message}</p>)} */}
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
                  disabled={isListening4}
                  // defaultValue=""
                  value={isListening4 ? textInput4 + (transcript4 ? ` ${transcript4}` : '') : textInput4}
                  onChange={(e) => { setTextInput4(e.target.value) }}
                  id="lessonMaterials"
                // {...register("lessonMaterials")}
                ></textarea>
                <div className="buttons">
                  <button
                    onClick={() => startStopListening(isListening4, textInput4, setTextInput4, transcript4, startListening4, stopListening4)}
                  >
                    {isListening4 ? 'Stop Listening' : 'Talk to Me'}
                  </button>
                  <button>Add URL</button>
                  <button>Upload Files</button>
                </div>
                {/* {errors.lessonMaterials && (<p className='error-message'>{errors.lessonMaterials.message}</p>)} */}
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
                  disabled={isListening5}
                  // defaultValue=""
                  value={isListening5 ? textInput5 + (transcript5 ? ` ${transcript5}` : '') : textInput5}
                  onChange={(e) => { setTextInput5(e.target.value) }}
                  id="lessonExercise"
                // {...register("lessonExercise")}
                ></textarea>
                <div className="buttons">
                  <button
                    onClick={() => startStopListening(isListening5, textInput5, setTextInput5, transcript5, startListening5, stopListening5)}
                  >
                    {isListening5 ? 'Stop Listening' : 'Talk to Me'}
                  </button>
                  <button>Add URL</button>
                  <button>Upload Files</button>
                </div>
                {/* {errors.lessonExercise && (<p className='error-message'>{errors.lessonExercise.message}</p>)} */}
              </div>
            </section>
            <div className="buttons">
              <button type="submit" className="formSubmit" onClick={onSubmit}>Submit Lesson</
              button>
            </div>
            {/* </form> */}
          </div>
          <div className="right-pane">
            <button className="card">
              <Link to="/teacher/livelesson">Live Lesson</Link>
            </button>
            <button className="card">
              <Link to="/teacher/lesson">Preview Lesson</Link>
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
