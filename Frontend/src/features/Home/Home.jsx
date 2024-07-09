import { Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import "./Home.scss"

const Home = () => {
  return (
    <div className="teacher-home">
      <Navbar />
      <div className="main">
        <div className="cards">
          <div className="card"><Link to="/class">Classes</Link></div>
          <div className="card"><Link to="/students">Students</Link></div>
          <div className="card"><Link to= "/notebook">Notebook</Link></div>
        </div>
        <div className="bottom-section">
          <div className="settings">
            <div className="card">My Settings</div>
          </div>

          <div className="launch">
            <h2>Lesson confirmed and ready to launch</h2>
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Lesson Goal Summary</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>----</td>
                  <td>----</td>
                  <td>----</td>
                  <td><button>Launch</button></td>
                </tr>
                <tr>
                  <td>----</td>
                  <td>----</td>
                  <td>----</td>
                  <td><button>Launch</button></td>
                </tr>
                <tr>
                  <td>----</td>
                  <td>----</td>
                  <td>----</td>
                  <td><button>Launch</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home