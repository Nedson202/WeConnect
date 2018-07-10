import React from 'react';

/**
 * @description Creates footer.
 * @returns {object} JSX object
 * @memberof Footer
 */
const Footer = () => (
  <div>
    <footer>
      <div className="container">
          © 2018
        <a className="float-right" href="https://weconnect-api-service.herokuapp.com/api-docs">Api docs</a>
      </div>
    </footer>
  </div>
);

export default Footer;
