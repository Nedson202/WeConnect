import React, { Component } from 'react';
import '../index.css'

class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="container">
            © 2018
            <a className="right" href="https://weconnect-api-service.herokuapp.com/api-docs">Api docs</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;

/*        <footer className="page-footer  blue-grey darken-4">
            <div className="footer-copyright">
                <div className="container">
                  © 2018
                  <a className="grey-text text-lighten-4 right" href="https://weconnect-api-service.herokuapp.com/api-docs">Api docs</a>
                </div>
            </div>

        </footer>
        <nav class="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">WeConnect</Link>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <Link to="/signup" className="nav-link">Signup</Link>
              </li>
            </ul>
          </div>
        </nav>*/
