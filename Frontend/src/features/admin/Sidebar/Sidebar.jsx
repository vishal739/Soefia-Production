import React from "react";
import "./sidebar.scss";
import { FaHome, FaChartArea, FaBuilding } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navRef = useRef();
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const showSidebar = () => {
    setIsMenuClicked(!isMenuClicked);
    navRef.current.classList.toggle("responsive_sidebar");
  };

  return (
    <div className={isMenuClicked ? "isactive" : "isactive-bigger"}>
      {isMenuClicked ? (
        <button className="sidebar-btn sidebar-close-btn" onClick={showSidebar}>
          <FaTimes fontSize={55} color="#3b5998" />
        </button>
      ) : (
        <button className="sidebar-btn" onClick={showSidebar}>
          <FaBars fontSize={55} color="#3b5998" />
        </button>
      )}
      <div className="admin-sidebar" ref={navRef}>
        <nav>
          <dl>
            <dt className="active">
              <Link to="/admin" className="custom-link">
                <FaHome fontSize={27} color="#3b5998" />
                Home
              </Link>
            </dt>
            <dt>
              <Link to="/admin/dashboard" className="custom-link">
                <FaChartArea fontSize={27} color="#3b5998" />
                Dashboard
              </Link>
            </dt>
            <dd>
              <Link to="/admin/chartviewer" className="custom-link">
                - Chart Viewer
              </Link>
            </dd>
            <dt>
              <FaBuilding fontSize={27} color="#3b5998" />
              Account
            </dt>
            <dd>- Organization Structure</dd>
            <dd>- Policies and Guardrails</dd>
            <dd>- Integrations</dd>
            <dd>- User Management and Permissions</dd>
            <dd>- Privacy and Data</dd>
          </dl>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
