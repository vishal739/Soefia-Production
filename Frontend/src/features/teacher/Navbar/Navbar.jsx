import "./navbar.scss";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userimg from "../../../assets/userProfile.png";
import profileIcon from "../../../assets/profile.png";
import settingIcon from "../../../assets/setting.png";
import logoutIcon from "../../../assets/logout.png"
import helpIcon from "../../../assets/help.png"
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
  const isLoggedIn = useSelector(selectCheckUser);
  const id = isLoggedIn?.id ?? 1;
  const [dropdown, setDropdown] = useState(false);
  const [navClick, setNavClick] = useState(true);
  const handleClick = () => {
    setNavClick(!navClick);
  };

  const handleLink = () => {
    if (!navClick) {
      handleClick();
    }
  };
  return (
    // <nav className="navbar-container">
    <header className="header">
      <div className="navLogo">
        <Link to={`/teacher`}>Soefia</Link>
      </div>

      <ul className={navClick ? "navBar" : "navBar active"}>
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
            {/* <div className="search">
                                    <input type="text" placeholder="Search" />
                                </div> */}
            <div className="input-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
              <input type="text" placeholder="Search..."></input>
            </div>
          </li>
          <li>
            <div className="navUser" onClick={() => setDropdown(!dropdown)}>
              <img className="user-pic" src={userimg} alt="User Profile" />
            </div>
          </li>
        </div>
      </ul>
      <div className={dropdown ? "sub-menu-wrap" : "sub-menu-wrap-off"}>
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
      </div>
      <div className="hamburger" onClick={handleClick}>
        {navClick ? (
          <FaBars size={20} style={{ color: "#fff" }} />
        ) : (
          // <p>Ham</p>
          <FaTimes size={20} style={{ color: "#fff" }} />
        )}
      </div>

    </header>
    // {/* </nav> */}
  );
};

export default Navbar;
