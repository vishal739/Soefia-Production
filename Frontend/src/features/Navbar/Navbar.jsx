import "./navbar.scss";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faBook,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectCheckUser } from "../auth/authSlice";

const Navbar = () => {
  const isLoggedIn = useSelector(selectCheckUser);
  const id = isLoggedIn?.id ?? 1;

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
        <Link to={`/teacher/${id}`}>Soefia</Link>
      </div>

      <ul className={navClick ? "navBar" : "navBar active"}>
        <div className="navLeft">
          <li>
            <Link to={`/teacher/${id}`} onClick={handleLink}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li>
            <Link to="/class" onClick={handleLink}>
              <FontAwesomeIcon icon={faUsers} />
            </Link>
          </li>
          <li>
            <Link to="/notebook" onClick={handleLink}>
              <FontAwesomeIcon icon={faBook} />
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
            <div className="navUser">
              <Link to="/teacher/1" onClick={handleLink}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          </li>
        </div>
      </ul>

      <div className="hamburger" onClick={handleClick}>
        {navClick ? (
          <FaBars size={20} style={{ color: "#fff" }} />
        ) : (
          // <p>Ham</p>
          <FaTimes size={20} style={{ color: "#fff" }} />
        )}
      </div>
      <nav className="dropdown-content">
        <ul>
          <li>
            <Link href="#">Profile</Link>
          </li>
          <li>
            <Link href="#">Setting</Link>
          </li>
          <li>
            <Link href="#">Help Center</Link>
          </li>
          <li>
            <Link href="#">FAQ</Link>
          </li>
        </ul>
      </nav>
    </header>
    // {/* </nav> */}
  );
};

export default Navbar;
