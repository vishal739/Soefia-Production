import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, selectCheckUser } from "../../auth/authSlice";
import { useEffect } from "react";
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
  const dispatch= useDispatch();
  const isLoggedIn= useSelector(selectCheckUser);

  useEffect(()=>{
    console.log("dispatching fetch user");
    dispatch(fetchUserAsync());
  },[dispatch])
  return (
    <div className="teacher-home">
      <Navbar />
      {console.log(isLoggedIn)}
      <div className="main">
        <h2>{isLoggedIn && isLoggedIn.email}</h2>
        <div className="part1">
          <button>My Delta Preference</button>
          <section className="teacher-cards">
            <Link to="/teacher/class" className="teacher-card">
              Classes
            </Link>
            <Link to="/teacher/students" className="teacher-card">
              Students
            </Link>
            <Link to="/teacher/notebook" className="teacher-card">
              Notebooks
            </Link>
          </section>
        </div>
        <div className="part2">
          <h3 className="teacher-lesson">Lessons</h3>
          <table className="lesson-table">
            <thead>
              <th>Status</th>
              <th>Class and Sections</th>
              <th>Date</th>
              <th>Lesson Topic</th>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id}>
                  {lesson.status == "Ready to Launch" ? (
                    <td>
                      <button>Ready to Launch</button>
                    </td>
                  ) : (
                    <td>{lesson.status}</td>
                  )}
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
  );
};

export default Home;
