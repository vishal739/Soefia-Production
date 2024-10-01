import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.scss";
import Button from "@mui/material/Button";
import { FaFile, FaRedo } from "react-icons/fa";
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

  const data = [
    {
      id: 1,
      status: "Ready to Launch",
      classSection: "Algebra I, Block A",
      date: "11/1/24",
      topic: "Absolute value functions",
    },
    {
      id: 2,
      status: "Ready to Launch",
      classSection: "Algebra I, Block C",
      date: "11/4/24",
      topic: "Recognizing relationships between information to c...",
    },
    {
      id: 3,
      status: "Draft",
      classSection: "Geometry, Block B",
      date: "11/4/24",
      topic: "Rigid transformations, specifically reflections",
    },
    {
      id: 4,
      status: "Draft",
      classSection: "Algebra I, Block C",
      date: "10/30/24",
      topic: "Solving one-step equations",
    },
    {
      id: 5,
      status: "Completed",
      classSection: "Algebra I, Block D",
      date: "10/30/24",
      topic: "Solving one-step equations",
    },
  ];

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    const filtered = data.filter((item) => {
      return e.target.value === "All" ? true : item.classSection === e.target.value;
    });
    setFilteredData(filtered);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    const filtered = data.filter((item) => {
      return e.target.value === "All" ? true : item.date === e.target.value;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(fetchClassesAsync({teacherId: isLoggedIn.userData._id}));
  }, [dispatch, isLoggedIn]);

  return (
    <>
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
                        <option value="Algebra I, Block A">
                          Algebra I, Block A
                        </option>
                        <option value="Algebra I, Block B">
                          Algebra I, Block B
                        </option>
                        <option value="Algebra I, Block C">
                          Algebra I, Block C
                        </option>
                        <option value="Algebra I, Block D">
                          Algebra I, Block D
                        </option>
                      </select>
                    </th>
                    <th>
                      <select
                        value={selectedDate}
                        onChange={handleDateChange}
                      >
                        <option value="All">Date</option>
                        <option value="10/30/24">10/30/24</option>
                        <option value="11/1/24">11/1/24</option>
                        <option value="11/4/24">11/4/24</option>
                      </select>
                    </th>
                    <th>Lesson Topic</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((lesson) => (
                    <tr key={lesson.id}>
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
                        <Button
                          variant="contained"
                          size="small"
                          className="revise-button"
                        >
                          Revise
                        </Button>
                      </td>
                      <td>{lesson.classSection}</td>
                      <td>{lesson.date}</td>
                      <td>{lesson.topic}</td>
                      <td><FaFile /></td>
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
                  {lessons.map((lesson) => (
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
      </div>
    </>
  );
};

export default Home;
