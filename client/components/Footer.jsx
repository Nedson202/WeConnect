import React from 'react';
import '../index.scss'

/**
   * @description Creates footer.
   * 
   * @returns {object} JSX object
   * 
   * @memberof Footer
   */
const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          © 2018
          <a className="float-right" href="https://weconnect-api-service.herokuapp.com/api-docs">Api docs</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
