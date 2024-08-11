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
        <button className="btn">Admin</button>
        <Link to="/login"><button className="btn">Teacher</button> </Link>
        <button className="btn">Student</button>
      </div>
    </div>
  );
};

export default HomePage;
