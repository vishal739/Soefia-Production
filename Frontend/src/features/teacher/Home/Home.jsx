import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.scss";
import Button from "@mui/material/Button";
import { FaFile, FaRedo, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAsync,
  selectCheckUser,
  selectUserStatus,
} from "../../auth/authSlice";
import { useEffect, useState } from "react";
import Loader from "../../../pages/Loader/Loader";
import { fetchClassesAsync } from "../../APILibrary/ClassesAPI/classesSlice";
import { deleteLessonAsync, fetchCurrentLessonAsync, fetchLessonAsync, selectLesson, selectLessonStatus } from "../../APILibrary/LessonAPI/lessonSlice";
import { format } from "date-fns";

const lessons = [
  {
    id: 1,
    status: "Ready to Launch",
    classSection: "Algebra I, Block A",
    date: "10/28/24",
    topic: "Absolute value functions",
  },
  {
    id: 2,
    status: "Ready to Launch",
    classSection: "Algebra I, Block C",
    date: "10/28/24",
    topic: "Recognizing relationships between information to c...",
  },
  {
    id: 3,
    status: "Draft",
    classSection: "Geometry, Block B",
    date: "10/26/24",
    topic: "Rigid transformations, specifically reflections",
  },
  {
    id: 4,
    status: "Draft",
    classSection: "Algebra I, Block C",
    date: "10/26/24",
    topic: "Solving one-step equations",
  },
  {
    id: 5,
    status: "Completed",
    classSection: "Algebra I, Block D",
    date: "10/25/24",
    topic: "Solving one-step equations",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectCheckUser);
  const isLoading = useSelector(selectUserStatus);
  const lessonData = useSelector(selectLesson)
  const isLesson = useSelector(selectLessonStatus);
  // const data = [
  //   {
  //     id: 1,
  //     status: "Ready to Launch",
  //     classSection: "Algebra I, Block A",
  //     date: "11/1/24",
  //     topic: "Absolute value functions",
  //   },
  //   {
  //     id: 2,
  //     status: "Ready to Launch",
  //     classSection: "Algebra I, Block C",
  //     date: "11/4/24",
  //     topic: "Recognizing relationships between information to c...",
  //   },
  //   {
  //     id: 3,
  //     status: "Draft",
  //     classSection: "Geometry, Block B",
  //     date: "11/4/24",
  //     topic: "Rigid transformations, specifically reflections",
  //   },
  //   {
  //     id: 4,
  //     status: "Draft",
  //     classSection: "Algebra I, Block C",
  //     date: "10/30/24",
  //     topic: "Solving one-step equations",
  //   },
  //   {
  //     id: 5,
  //     status: "Completed",
  //     classSection: "Algebra I, Block D",
  //     date: "10/30/24",
  //     topic: "Solving one-step equations",
  //   },
  // ];

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredData, setFilteredData] = useState(lessonData);

  const uniqueLessonsDate = lessonData
    ? lessonData.reduce((acc, lesson) => {
      const formattedDate = lesson.date ? format(new Date(lesson.date), "dd/MM/yyyy") : "Invalid date";

      // Check if this formatted date is already in the accumulator
      if (!acc.some(item => item.date === formattedDate)) {
        acc.push({ _id: lesson._id, date: formattedDate });
      }

      return acc;
    }, [])
    : [];
  const handleClassChange = (e) => {

    setSelectedClass(e.target.value);
    const filtered = lessonData.filter((item) => {
      return e.target.value === "All" ? true : item.classId._id === e.target.value;
    });
    setFilteredData(filtered);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    const filtered = lessonData.filter((item) => {
      return e.target.value === "All" ? true : format(new Date(item.date), "dd/MM/yyyy") === e.target.value;
    });
    setFilteredData(filtered);
  };
  const handleLessonDelete = (lessonId) => {
    console.log("handle delete", lessonId);
    dispatch(deleteLessonAsync({ lessonId: lessonId }))
    .then(() => {
      setFilteredData(prevData => prevData.filter(lesson => lesson._id !== lessonId));
    })
    .catch((error) => {
      console.error("Error deleting lesson:", error);
    });
  }
  useEffect(() => {
    console.log("teacherId: ", isLoggedIn.userData._id)
    dispatch(fetchLessonAsync({ teacherId: isLoggedIn.userData._id }));
    
  }, [dispatch, isLoggedIn]);

  return (
    <>
      {console.log("filteredData", filteredData)}
      {isLesson == "loading" ? <Loader /> :
        <div className="teacher-home-container">
          <Navbar />
          {console.log(isLoggedIn)}
          <div className="teacher-home-main">
            <h2>{isLoggedIn && isLoggedIn.email}</h2>
            <div className="teacher-home-contents">
              {/* <Link to="/teacher/mydeita" className="link"><button>My Delta Preference</button></Link> */}
              <div className="teacher-home-buttons">
                <Link to="/teacher/class" className="teacher-card">
                  <button>Classes</button>
                </Link>
                <Link to="/teacher/students" className="teacher-card">
                  <button>Students</button>
                </Link>
                <Link to="/teacher/notebook" className="teacher-card">
                  <button>Notebooks</button>
                </Link>
              </div>
              <div className="upcoming-lesson-table-container">
                <div className="upcoming-lesson-table-heading">
                  <p>Upcoming Lessons</p>
                  <span>
                    <FaRedo size={25} color="#928f8f" />
                    <div className="input-container">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="search"
                      />
                      <input type="text" placeholder="Search..."></input>
                    </div>
                  </span>
                </div>
                <table className="upcoming-lesson-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>
                        <select
                          value={selectedClass}
                          onChange={handleClassChange}
                        >
                          <option value="All">Class</option>
                          {isLoggedIn.userData.classId && isLoggedIn.userData.classId.map((className, index) => (
                            <option key={index} value={className._id}> {className.name} </option>
                          ))}
                        </select>
                      </th>
                      <th>
                        <select
                          value={selectedDate}
                          onChange={handleDateChange}
                        >
                          <option value="All">Date</option>
                          {uniqueLessonsDate && uniqueLessonsDate.map((lessonDate, index) => (
                            <option key={index} value={lessonDate.date}>
                              {lessonDate.date }
                            </option>
                          ))}
                        </select>
                      </th>
                      <th>Lesson Topic</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData && filteredData.map((lesson) => (
                      <tr key={lesson._id}>
                        {lesson.status === "Ready to Launch" ? (
                          <td>
                            <Link to="/teacher/livelesson">
                              <Button variant="outlined" className="status-button">
                                Ready to Launch

                              </Button>
                            </Link>
                          </td>
                        ) : (
                          <td>{lesson.status}</td>
                        )}
                        <td>
                          <Link to={`/teacher/lesson?lessonId=${encodeURIComponent(lesson._id)}&className=${encodeURIComponent(lesson.classId._id)}`}>
                            <Button
                              variant="contained"
                              size="small"
                              className="revise-button"
                            // onClick={()=>dispatch(fetchCurrentLessonAsync({lessonId: lesson._id}))}
                            >
                              Revise
                            </Button>
                          </Link>
                        </td>
                        <td>{lesson.classId ? lesson.classId.name : "Invalid class"}</td>
                        <td>{format(new Date(lesson.date), "dd/MM/yyyy")}</td>
                        <td>{lesson.title}</td>
                        <td className="actions">
                          <div >
                            <FaFile className="actionIcon" />
                          </div>
                          <div>
                            <FaTrash className="actionIcon" onClick={()=>handleLessonDelete(lesson._id)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="deita-pref-button">
                <Link to="/teacher/mydeita">
                  <button>DeiTA Preferences</button>
                </Link>
              </div>
              <div className="completed-lesson-table-container">
                <div className="completed-lesson-table-heading">
                  <p>Recently Completed Lessons</p>
                  <span>
                    <FaRedo size={25} color="#928f8f" />
                    <div className="input-container">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="search"
                      />
                      <input type="text" placeholder="Search..."></input>
                    </div>
                  </span>
                </div>
                <table className="completed-lesson-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Lesson Topic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons && lessons.map((lesson) => (
                      <tr key={lesson.id}>
                        <td>
                          <FaFile />
                        </td>
                        <td>{lesson.classSection}</td>
                        <td>{lesson.date}</td>
                        <td>{lesson.topic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
};

export default Home;
