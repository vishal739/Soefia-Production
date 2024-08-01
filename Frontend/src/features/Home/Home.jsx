import { Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import "./Home.scss"
import userimg from "../../assets/userProfile.jpg";
const Home = () => {
  const currentDate = new Date().toLocaleDateString();
  const school = "school name";
  const user = "username";
  return (

    <div className="teacher-home">
      <Navbar />
      <div className="main">
        <div>
          <section className="teacher-cards">
  
            <Link to="/class"><div className="teacher-card">Classes</div></Link>
            <Link to="/students"><div className="teacher-card">Students</div></Link>
            <Link to="/notebook"> <div className="teacher-card">Notebooks</div></Link>
          </section>
          <h3 className="teacher-lesson">Lesson confirmed and ready to launch</h3>
          <div className="teacher-lesson-launch">
            <section className="teacher-settings">
            <Link to="/teacher/:id"><div className="teacher-setting-card">My Settings</div></Link>
            </section>

            <div className="teacher-grid-table">
              <div></div>
              <div className="teacher-grid-header">Class</div>
              <div className="teacher-grid-header">Date</div>
              <div className="teacher-grid-header">Lesson Goal Summary</div>

              <div>
                <button className="teacher-button">Launch</button>
              </div>
              <div className="teacher-grid-item">Math 101</div>
              <div className="teacher-grid-item">30/07/24</div>
              <div className="teacher-grid-item">Introduction to algebra</div>

              <div>
                <button className="teacher-button">Launch</button>
              </div>
              <div className="teacher-grid-item">History 201</div>
              <div className="teacher-grid-item">28/07/24</div>
              <div className="teacher-grid-item">Ancient Civilization</div>

              <div>
                <button className="teacher-button">Launch</button>
              </div>
              <div className="teacher-grid-item">Science 301</div>
              <div className="teacher-grid-item">29/07/24</div>
              <div className="teacher-grid-item">Basics of chemistry</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home