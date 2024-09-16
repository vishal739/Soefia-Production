import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./home.scss";
import { FaBolt } from "react-icons/fa";




const Home = () => {
  return (
    <div className="admin-home-container">
      <Navbar />
    <div className="admin-home-main">
        <Sidebar/>
          <div className="admin-home-panel">
          <div className="admin-home-panel-first">
            <div className="counts">
              <div>
                <b>Available DeiTAs :</b>
                <span>6</span>
              </div>
              <div>
                <b>Working :</b>
                <span>4</span>
              </div>
              <div>
                <b>Available :</b>
                <span>2</span>
              </div>
              <div>
                <b>Student Accounts :</b>
                <span>103</span>
              </div>
            </div>
            <div className="administration">
              <section><FaBolt fontSize={30} color="#3b5998"/></section>
              <section>
              <p>Administration Console</p>
              <b>User :</b>
              <b>School :</b>
              </section>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>DeiTA Identification</th>
                  <th>Started Working</th>
                  <th>Stopped Working</th>
                  <th>Class Assisted</th>
                  <th>Class Period Assigned</th>
                  <th>Teacher Assisted</th>
                  <th>Lessons Assisted</th>
                  <th>Students Assisted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                </tr>
                <tr>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                </tr>
                <tr>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                </tr>
                <tr>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                  <td>-------</td>
                </tr>
                {/* <!-- Add more rows as needed --> */}
              </tbody>
            </table>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Home;
