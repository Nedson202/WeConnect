import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from './search/SearchForm.jsx';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import { filterBusiness } from '../actions/businessQueryAction';
import '../index.css';

class Navbar extends Component {

  logout(e) {
    e.preventDefault(e);
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { filterBusiness } = this.props;

    const userLinks = (
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <Link to="/businesses" className="nav-link" id="business">Businesses</Link>
        </li>
        <li class="nav-item">
          <Link to="/dashboard" className="nav-link" id="dashboard">Dashboard</Link>
        </li>
        <li class="nav-item">
          <a href="#" onClick={this.logout.bind(this)} className="nav-link" id="logout">Logout</a>
        </li>
      </ul>
    )

    const AdminLinks = (
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <Link to="/businesses" className="nav-link" id="business">Businesses</Link>
        </li>
        <li class="nav-item">
          <Link to="/adminpanel" className="nav-link" id="admin">AdminPanel</Link>
        </li>
        <li class="nav-item">
          <a href="#" onClick={this.logout.bind(this)} className="nav-link" id="logout">Logout</a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <Link to="/businesses" className="nav-link" id="business">Businesses</Link>
        </li>
        <li class="nav-item">
          <Link to="/login" className="nav-link" id="login">Login</Link>
        </li>
        <li class="nav-item">
          <Link to="/signup" className="nav-link" id="signup">Signup</Link>
        </li>
      </ul>
    )
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">WeConnect</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <SearchForm filterBusiness={filterBusiness}/>
            { (isAuthenticated && (user.username === 'admin')) ? AdminLinks
              : isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  businesses: PropTypes.array.isRequired,
  filterBusiness: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    businesses: state.businesses,
  }
}

export default connect(mapStateToProps, { filterBusiness, logout })(Navbar);
