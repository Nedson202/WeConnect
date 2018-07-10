import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from '../search/SearchForm';
import { logout } from '../../actions/userActions';
import filterBusiness from '../../actions/businessQueryAction';
import addFlashMessage from '../../actions/flashMessages';
import loader from '../../actions/loader';
/**
 * @class Navbar
 *
 * @extends {Component}
 */
class Navbar extends Component {
  /**
   * @description Creates an instance of search from.
   *
   * @param {object} props
   *
   * @memberof Navbar
   */
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      option: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * @description Handles input change
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof SearchForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value.toLowerCase() });
  }

  /**
   * @description Handles input submission
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof SearchForm
   */
  onSubmit(event) {
    event.preventDefault();
    const { query, option } = this.state;
    const { history } = this.context.router;

    if (query.length === 0 || option.length === 0) {
      return toastr.error(`Please type the business you are looking for inside the input box
      and select an option`);
    }

    this.props.filterBusiness(option, query, 'page=1', history);
  }

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
    const { state, onChange, onSubmit } = this;

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
          <button onClick={this.logout} className="nav-link" id="navbar-button">
            <i className="fa fa-sign-out" /> Logout
          </button>
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
          <button onClick={this.logout} className="nav-link" id="navbar-button">Logout</button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          {businessLink}
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <i className="fa fa-sign-in" /> Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
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
            <i className="fa fa-navicon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <SearchForm
              filterBusiness={this.props.filterBusiness}
              addFlashMessage={this.props.addFlashMessage}
              state={state}
              onChange={onChange}
              onSubmit={onSubmit}
            />
            {
              (isAuthenticated && (user.username === process.env.ADMIN)) ? AdminLinks :
              (
                <span className="nav-content">
                  {isAuthenticated ? userLinks : guestLinks}
                </span>)
            }
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  filterBusiness: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};

Navbar.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => {
  const { auth, businesses, isLoading } = state;
  return {
    auth,
    searchResult: businesses.searchResult,
    isLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  filterBusiness,
  logout,
  addFlashMessage,
  loader
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
