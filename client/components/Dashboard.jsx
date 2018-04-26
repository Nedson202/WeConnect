import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import FlashMessagesList from './flash/FlashMessagesList';
import { getName } from '../utils/getUsername';
import BusinessRegistration from './business-registration/BusinessRegistration.jsx';
import BusinessList from './BusinessList.jsx';
import Footer from './Footer.jsx';
import '../index.css';
import { fetchBusinessesByUserId } from '../actions/fetchBusinessAction';

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      isHidden: false
    };

    this.handleVisibility = this.handleVisibility.bind(this);
  }

  componentDidMount() {
    // const hideDash = document.getElementById('dashboard');
    // hideDash.classList.add('hide')
    // const showDrop = document.getElementById('dropleft');
    // showDrop.classList.remove('hide')
    document.title = 'My dashboard'
    this.props.fetchBusinessesByUserId();
  }

  handleVisibility() {
    this.setState((prevState) => {
      return {
        isHidden: !prevState.isHidden
      }
    })
  }

  render() {
    const { businesses } = this.props;
    return (
      <div>
        <Navbar />
        <FlashMessagesList />
        <div className="dashboard-heading">
          <h3>Welcome {getName()}!</h3>

          <Link to="/registerbusiness" className="link"><button className="btn btn-outline-success permission-button" id="permission-button">
            Register a business</button></Link>
        </div>

        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.handleVisibility}>
          {this.state.isHidden ? 'Hide permission' : 'Show permission'}
        </button>

        {this.state.isHidden && (
          <div className="card dashboard-card ">
            <div className="card-body">
              <h5 className="card-title">Hi {getName()}!</h5>
              <p className="card-text">You have the permission to perform the following.</p>
              <ul>
                <li>Register a business</li>
                <li>Delete your business</li>
                <li>Update your business</li>
              </ul>
            </div>
          </div>
        )}
        <BusinessList businesses={businesses} />

        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  businesses: PropTypes.array.isRequired,
  fetchBusinessesByUserId: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses
  }
}

export default connect(mapStateToProps, { fetchBusinessesByUserId })(Dashboard);
