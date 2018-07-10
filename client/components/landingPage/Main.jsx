import React from 'react';
import { Link } from 'react-router-dom';

/**
   * @description Create main content in homepage.
   *
   * @returns {object} JSX object
   *
   * @memberof Main
   */
const Main = () => (
  <div>
    <div className="text-center" id="main-content">
      <h1>Welcome to WeConnect</h1>
      <h3>Here, we make it easier for you to reach businesses faster</h3>
      <Link to="/businesses"><button className="btn" id="explore-button">Explore</button></Link>
    </div>
  </div>
);

export default Main;
