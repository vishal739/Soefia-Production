import {React,useEffect} from "react";
import "./Home.scss";
import Navbar from "../Navbar/Navbar";
import { FaUserCircle, FaMicrophone ,FaFile } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, selectCheckUser } from "../../auth/authSlice";
const Home = () => {
  const isLoggedIn= useSelector(selectCheckUser);
  const dispatch= useDispatch()
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     dispatch(fetchUserAsync());
  //   }
  // }, [dispatch, isLoggedIn]);
  console.log("isLoggedIn", isLoggedIn)
  return (
    <div className="st-home">
      <Navbar />
      <div className="st-home-main">
        <div className="first-container">
          <div className="st-leftpart">
            <Link to="/student/live"><button>Enter Live Lesson</button></Link>
            <section className="class-select">
              <label htmlFor="class-select">Class</label>
              <select>
                <option>Algebra I, Block A</option>
                <option>Chemistry, Block C</option>
                {/* Add more options here */}
              </select>
            </section>
          </div>
          <div className="student-info">
            <span className="photo">
              <FaUserCircle fontSize={85} color="#3b5998" />
            </span>
            <div className="details">
              <p>
                <b>Date : </b> October 29,2024
              </p>
              <p>
                <b>School :</b> Boston Garden
              </p>
              <p>
                <b>Student :</b> {isLoggedIn? isLoggedIn.name : "Guest"}
              </p>
            </div>
            <button>
              <FaMicrophone className="search" />
              Say Something
            </button>
          </div>
        </div>
        <div className="second-container">
          <div className="st-input-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
            <input type="text" placeholder="Search..."></input>
          </div>
          <table className="st-table">
            <thead>
              <tr>
                <th>Notebooks</th>
                <th>Date</th>
                <th>Academic Lesson Goal</th>
                <th>Key Concepts Taught</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><FaFile/></td>
                <td>10/28/24</td>
                <td>Graph and determine key features of an...</td>
                <td>Absolute value functions</td>
              </tr>
              <tr>
                <td><FaFile/></td>
                <td>10/28/24</td>
                <td>Graph and determine key features of an...</td>
                <td>Absolute value functions</td>
              </tr>
              <tr>
                <td><FaFile/></td>
                <td>10/28/24</td>
                <td>Graph and determine key features of an...</td>
                <td>Absolute value functions</td>
              </tr>
              <tr>
                <td><FaFile/></td>
                <td>10/28/24</td>
                <td>Graph and determine key features of an...</td>
                <td>Absolute value functions</td>
              </tr>
              <tr>
                <td><FaFile/></td>
                <td>10/28/24</td>
                <td>Graph and determine key features of an...</td>
                <td>Absolute value functions</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
                <td>-----</td>
              </tr>
              
              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
