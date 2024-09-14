import React from 'react';
import './Hero.scss'; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-heading">
        <h1>Welcome to Soefia</h1>
        <h3>Your teaching assistance</h3>
      </div>
      <div className="home-btn">
        <Link to="/admin/login"><button className="btn">Admin</button></Link>
        <Link to="/teacher/login"><button className="btn">Teacher</button> </Link>
        <Link to="/student/login"><button className="btn">Student</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
