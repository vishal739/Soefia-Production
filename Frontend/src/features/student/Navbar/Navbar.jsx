import "./Navbar.scss";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userimg from "../../../assets/userProfile.png";
import profileIcon from "../../../assets/profile.png";
import settingIcon from "../../../assets/setting.png";
import logoutIcon from "../../../assets/logout.png";
import helpIcon from "../../../assets/help.png";
import {
  faHome,
  faUsers,
  faBook,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectCheckUser } from "../../auth/authSlice";

const Navbar = () => {
  // const isLoggedIn = useSelector(selectCheckUser);
  // const id = isLoggedIn?.id ?? 1;
  const [dropdown, setDropdown] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  // const handleLink = () => {
  //   if (!navClick) {
  //     handleClick();
  //   }
  // };
  return (
    <header className="st-header">
      <div className="st-navLogo">
        <Link to={`/student`}>Soefia</Link>
      </div>
      <div className="navContent" ref={navRef}>
        <section className="navLeft">
          <span>
            <Link to={`/student`}>
              <FontAwesomeIcon icon={faHome} className="fa-icon" />
            </Link>
          </span>
          <span>
            <Link to={`/student/notebook`}>
              <FontAwesomeIcon icon={faBook} className="fa-icon" />
            </Link>
          </span>
          <span>
            {/* <Link to={`/`}>Back</Link> */}
          </span>
        </section>
        <section className="navRight">
          <span>
            <Link to={`/help`}>Help</Link>
          </span>
          <div className="st-input-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
            <input type="text" placeholder="Search..."></input>
          </div>
        </section>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </div>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>

      {/* <div className="hamburger" onClick={handleClick}>
        {navClick ? (
          <FaBars size={20} style={{ color: "#fff" }} />
        ) : (
          <FaTimes size={20} style={{ color: "#fff" }} />
        )}
      </div> */}
      {/* <ul className={navClick ? "navBar" : "navBar active"}>
        <div className="navLeft">
          <li>
            <Link to={`/teacher`} onClick={handleLink}>
              <FontAwesomeIcon icon={faHome} className="fa-icon" />
            </Link>
          </li>
          <li>
            <Link to="/teacher/class" onClick={handleLink}>
              <FontAwesomeIcon icon={faUsers} className="fa-icon" />
            </Link>
          </li>
          <li>
            <Link to="/teacher/notebook" onClick={handleLink}>
              <FontAwesomeIcon icon={faBook} className="fa-icon" />
            </Link>
          </li>

        </div>
        <div className="navRight">
          <li>
            <div className="input-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
              <input type="text" placeholder="Search..."></input>
            </div>
          </li>
        </div>
      </ul> */}
      {/* <div className={dropdown ? "sub-menu-wrap" : "sub-menu-wrap-off"}>
        <nav className="sub-menu">
          <div className="user-info">
            <img src={userimg} alt="" />
            <h3>John Dey</h3>
          </div>
          <hr></hr>
          <ul>
            <li>
              <Link href="#" className="sub-menu-link">
                <img src={profileIcon}></img>
                <p>Edit Profile</p>
                <span>{">"}</span>
              </Link>
              <hr></hr>
            </li>
            <li>
              <Link href="#" className="sub-menu-link">
                <img src={settingIcon}></img>
                <p>Settings & Privacy</p>
                <span>{">"}</span>
              </Link>
              <hr></hr>
            </li>

            <li>
              <Link href="#" className="sub-menu-link">
                <img src={helpIcon}></img>
                <p>Help & Support</p>
                <span>{">"}</span>
              </Link>
              <hr></hr>
            </li>
            <li>
              <Link href="#" className="sub-menu-link">
                <img src={logoutIcon}></img>
                <p>Logout</p>
                <span>{">"}</span>
              </Link>

            </li>
          </ul>
        </nav>
      </div> */}
    </header>
  );
};

export default Navbar;
