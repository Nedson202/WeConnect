import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from './search/SearchForm';
import { logout } from '../actions/loginActions';
import filterBusiness from '../actions/businessQueryAction';
import addFlashMessage from '../actions/flashMessages';
import '../index.scss';

/**
 * @class Navbar
 *
 * @extends {Component}
 */
class Navbar extends Component {
  /**
   * @description log user out
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof Navbar
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.context.router.history.push('/login');
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof Navbar
   */
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const businessLink = (
      <Link to="/businesses" className="nav-link" id="business">
        <i className="fa fa-briefcase" /> Businesses
      </Link>
    );

    const userLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          {businessLink}
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link" id="dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <a href="#" onClick={this.logout.bind(this)} className="nav-link" id="logout">
            <i className="fa fa-sign-out" /> Logout
          </a>
        </li>
      </ul>
    );

    const AdminLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          {businessLink}
        </li>
        <li className="nav-item">
          <Link to="/adminpanel" className="nav-link" id="admin">AdminPanel</Link>
        </li>
        <li className="nav-item">
          <a href="#" onClick={this.logout.bind(this)} className="nav-link" id="logout">Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          {businessLink}
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link" id="login">
            <i className="fa fa-sign-in" /> Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" id="signup">
            <i className="fa fa-sign-in" /> Signup
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <Link to="/" className="navbar-brand">WeConnect</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <SearchForm
              filterBusiness={this.props.filterBusiness}
              addFlashMessage={this.props.addFlashMessage}
            />
            { (isAuthenticated && (user.username === 'admin')) ? AdminLinks
              : isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  filterBusiness: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  businesses: state.businesses,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  filterBusiness,
  logout,
  addFlashMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
