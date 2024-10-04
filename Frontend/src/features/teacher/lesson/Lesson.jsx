import "./Lesson.scss";
import Navbar from "../Navbar/Navbar";
import mic from "../../../assets/mic.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSpeechToText from "../../webSpeech/useSpeechToText";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { faPray } from "@fortawesome/free-solid-svg-icons";
import { selectCheckUser } from "../../auth/authSlice";
import {
  createLessonAsync,
  fetchCurrentLessonAsync,
  fetchLessonAsync,
  selectCurrentLesson,
  selectLessonStatus,
  updateLessonAsync,
} from "../../APILibrary/LessonAPI/lessonSlice";
import { updateTeacherAsync } from "../../APILibrary/TeacherAPI/teacherSlice";
import { Button } from "@mui/material";
import { createDeitaAsync, fetchDeitaAsync, selectDeita, selectDeitaLoader } from "../../APILibrary/DeitaAPI/deitaSlice";
import { updateLesson } from "../../APILibrary/LessonAPI/lessonAPI";
import Loader from "../../../pages/Loader/Loader";

const Lesson = () => {
  const isLoggedIn = useSelector(selectCheckUser);
  const currentLesson = useSelector(selectCurrentLesson);
  const isLessonLoading = useSelector(selectLessonStatus)
  const isDeitaLoading = useSelector(selectDeitaLoader);
  const [isSubmitted, setSubmitted] = useState(false);
  const [textInput1, setTextInput1] = useState(currentLesson?.lessonStructureOverview || "");
  const [textInput2, setTextInput2] = useState(currentLesson?.learningGoals || "");
  const [textInput3, setTextInput3] = useState(currentLesson?.socialCollaborationGoal || "");
  const [textInput4, setTextInput4] = useState(currentLesson?.lessonMaterials || "");
  const [textInput5, setTextInput5] = useState(currentLesson?.lessonExercise || "");
  const [startDate, setStartDate] = useState(currentLesson?.date ? new Date(currentLesson.date) : new Date());
  const [title, setTitle] = useState(currentLesson?.title || "");

  // const [textInput6, setTextInput6] = useState('');

  const speechToText1 = useSpeechToText({ continuous: true });
  const speechToText2 = useSpeechToText({ continuous: true });
  const speechToText3 = useSpeechToText({ continuous: true });
  const speechToText4 = useSpeechToText({ continuous: true });
  const speechToText5 = useSpeechToText({ continuous: true });
  // const speechToText6 = useSpeechToText({ continuous: true });

  // Then you can access them like this:
  const {
    isListening: isListening1,
    transcript: transcript1,
    startListening: startListening1,
    stopListening: stopListening1,
  } = speechToText1;
  const {
    isListening: isListening2,
    transcript: transcript2,
    startListening: startListening2,
    stopListening: stopListening2,
  } = speechToText2;
  const {
    isListening: isListening3,
    transcript: transcript3,
    startListening: startListening3,
    stopListening: stopListening3,
  } = speechToText3;
  const {
    isListening: isListening4,
    transcript: transcript4,
    startListening: startListening4,
    stopListening: stopListening4,
  } = speechToText4;
  const {
    isListening: isListening5,
    transcript: transcript5,
    startListening: startListening5,
    stopListening: stopListening5,
  } = speechToText5;
  // const { isListening: isListening6, transcript: transcript6, startListening: startListening6, stopListening: stopListening6 } = speechToText6;

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

  const deita = useSelector(selectDeita)
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const className = queryParams.get("className");
  const lessonId = queryParams.get("lessonId");
  const navigate = useNavigate();
  const formattedDate = format(startDate, "dd/MM/yyyy");
  const clearTranscripts = () => {
    speechToText1.clearTranscript();
    speechToText2.clearTranscript();
    speechToText3.clearTranscript();
    speechToText4.clearTranscript();
    speechToText5.clearTranscript();
  };

  const resetForm = () => {
    setTextInput1("");
    setTextInput2("");
    setTextInput3("");
    setTextInput4("");
    setTextInput5("");
    setTitle("");
    setStartDate(new Date());
    clearTranscripts();
  }
  const onSubmit = () => {
    const lessonData = {
      teacherId: isLoggedIn.userData._id,
      title: title,
      date: formattedDate,
      classId: className,
      lessonStructureOverview: textInput1,
      learningGoals: textInput2,
      socialCollaborationGoal: textInput3,
      lessonMaterials: textInput4,
      lessonExercise: textInput5,
    };
    console.log("Creating lesson for this data: ", lessonData);
    if (lessonId) {
      lessonData._id = lessonId;
      lessonData.classId = className;
      dispatch(updateLessonAsync(lessonData)).then((result) => {
        // console.log("currentLesson: ", result.payload)
        const currentLessonId = result.payload._id;
        dispatch(createDeitaAsync({ lessonId: currentLessonId }));
      });
    } else {
      if (!isSubmitted) {
        dispatch(createLessonAsync(lessonData)).then((result) => {
          // console.log("currentLesson: ", result.payload)
          setSubmitted(true);
          const currentLessonId = result.payload._id;
          dispatch(createDeitaAsync({ lessonId: currentLessonId }));
        });
      }
    }
    if (isSubmitted) {
      alert("Lesson Submitted already to do any change goto reviseLesson")
    } else {
      alert("Lesson Submitted")
    }

  };

  const handlePreviewLessonClick = () => {
    // Navigate to the lesson page with the selected class as a parameter
    // console.log("deitaLesson: ", deita)
    if (currentLesson._id) {
      if (lessonId) {
        dispatch(fetchDeitaAsync({ lessonId: lessonId }))
      }
      navigate(
        `/teacher/groups?lessonId=${encodeURIComponent(currentLesson._id)}`
      );
    } else {
      alert("Please create a lesson before preview lesson.");
    }
  };
  useEffect(() => {
    if (lessonId) {
      dispatch(fetchCurrentLessonAsync({ lessonId: lessonId }))
        .then((result) => {
          const lesson = result.payload;
          setTextInput1(lesson?.lessonStructureOverview || "");
          setTextInput2(lesson?.learningGoals || "");
          setTextInput3(lesson?.socialCollaborationGoal || "");
          setTextInput4(lesson?.lessonMaterials || "");
          setTextInput5(lesson?.lessonExercise || "");
          setTitle(lesson?.title || "");
          setStartDate(lesson?.date ? new Date(lesson.date) : new Date());
        });
        dispatch(fetchDeitaAsync({lessonId: lessonId}))
    } else {
      resetForm();
    }
  }, [lessonId, dispatch])
  return (
    <>
      {isLessonLoading == "loading" ? <Loader /> :
        <div className="less-box">
          <Navbar />
          <div className="main">
            <div className="teacher-lesson-main-heading">
              <h2>Lesson Creation</h2>
              <div className="uploadFiles">
                <span>Read From My Lesson Plan</span>
                <Button variant="contained">Upload Files</Button>
              </div>
            </div>
            <div className="lesson-container">
              <div className="lesson-left-pane">
                {/* <form noValidate
              onSubmit={handleSubmit(onSubmit)}> */}
                <section>
                  <div className="titleAndDate">
                    <label>
                      Title:{" "}
                      <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        className="inputBox"
                        value={title}
                      />
                    </label>
                    <label>
                      Date:{" "}
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="inputBox"
                      />
                    </label>
                  </div>
                  <div className="headings">
                    <h4>Lesson Structure or Overview</h4>
                    <img className="mic-icon" src={mic} alt="failed to load" />
                  </div>
                  <div>
                    <textarea
                      // defaultValue=""
                      className="lesson-text-area"
                      disabled={isListening1}
                      value={
                        isListening1
                          ? textInput1 + (transcript1 ? ` ${transcript1}` : "")
                          : textInput1
                      }
                      onChange={(e) => {
                        setTextInput1(e.target.value);
                      }}
                      id="LessonStructureOverview"
                    // {...register("LessonStructureOverview")}
                    ></textarea>

                    <div className="buttons">
                      <button
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
                        value={
                          isListening2
                            ? textInput2 + (transcript2 ? ` ${transcript2}` : "")
                            : textInput2
                        }
                        onChange={(e) => {
                          setTextInput2(e.target.value);

                        }}
                        id="learningGoals"
                      // {...register("learningGoals")}
                      ></textarea>
                      <div className="buttons">
                        <button
                          onClick={() =>
                            startStopListening(
                              isListening2,
                              textInput2,
                              setTextInput2,
                              transcript2,
                              startListening2,
                              stopListening2
                            )
                          }
                        >
                          {isListening2 ? "Stop Listening" : "Talk to Me"}
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
                        value={
                          isListening3
                            ? textInput3 + (transcript3 ? ` ${transcript3}` : "")
                            : textInput3
                        }
                        onChange={(e) => {
                          setTextInput3(e.target.value);
                        }}
                        id="SocialCollaborationGoal"
                      // {...register("SocialCollaborationGoal")}
                      ></textarea>
                      <div className="buttons">
                        <button
                          onClick={() =>
                            startStopListening(
                              isListening3,
                              textInput3,
                              setTextInput3,
                              transcript3,
                              startListening3,
                              stopListening3
                            )
                          }
                        >
                          {isListening3 ? "Stop Listening" : "Talk to Me"}
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
                      value={
                        isListening4
                          ? textInput4 + (transcript4 ? ` ${transcript4}` : "")
                          : textInput4
                      }
                      onChange={(e) => {
                        setTextInput4(e.target.value);
                      }}
                      id="lessonMaterials"
                    // {...register("lessonMaterials")}
                    ></textarea>
                    <div className="buttons">
                      <button
                        onClick={() =>
                          startStopListening(
                            isListening4,
                            textInput4,
                            setTextInput4,
                            transcript4,
                            startListening4,
                            stopListening4
                          )
                        }
                      >
                        {isListening4 ? "Stop Listening" : "Talk to Me"}
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
                      value={
                        isListening5
                          ? textInput5 + (transcript5 ? ` ${transcript5}` : "")
                          : textInput5
                      }
                      onChange={(e) => {
                        setTextInput5(e.target.value);
                      }}
                      id="lessonExercise"
                    // {...register("lessonExercise")}
                    ></textarea>
                    <div className="buttons">
                      <button
                        onClick={() =>
                          startStopListening(
                            isListening5,
                            textInput5,
                            setTextInput5,
                            transcript5,
                            startListening5,
                            stopListening5
                          )
                        }
                      >
                        {isListening5 ? "Stop Listening" : "Talk to Me"}
                      </button>
                      <button>Add URL</button>
                      <button>Upload Files</button>
                    </div>
                    {/* {errors.lessonExercise && (<p className='error-message'>{errors.lessonExercise.message}</p>)} */}
                  </div>
                </section>
                <div className="buttons">
                  <button type="submit" className="formSubmit" onClick={onSubmit}>
                    Submit Lesson
                  </button>
                  <button type="submit" className="formSubmit" onClick={resetForm}>
                    Reset Lesson
                  </button>
                </div>
                {/* </form> */}
              </div>
              <div className="lesson-right-pane">
                <button
                  className="preview-card"
                  onClick={handlePreviewLessonClick}
                  disabled={isDeitaLoading === "loading"}
                >
                  {isDeitaLoading === "loading" ? "Loading, please wait..." : "Preview Lesson"}
                </button>

                <div className="groups-options">
                  <p>Groups</p>
                  <div className="select">
                    <label>Formation</label>
                    <select name="Type" id="">
                      <option>Alphabetic</option>
                    </select>
                  </div>
                  <div className="select">
                    <label>Naming</label>
                    <select name="group-count" id="">
                      <option>By Number</option>
                      {/* <option>2</option>
                  <option>3</option>
                  <option>4</option> */}
                    </select>
                  </div>
                  <div className="select">
                    <label>Targeted Group Size</label>
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
        </div>}
    </>
  );
};

export default Lesson;
