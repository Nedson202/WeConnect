import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import FlashMessagesList from './flash/FlashMessagesList';
import BusinessRegistration from './business-registration/BusinessRegistration.jsx';
import UserList from './user/UserList.jsx';
import BusinessList from './BusinessList.jsx';
import { getName } from '../utils/getUsername';
import Footer from './Footer.jsx';
import '../index.css';
import { fetchBusinesses } from '../actions/fetchBusinessAction';
import { deleteBusiness } from '../actions/deleteBusinessAction';
import { deleteUser } from '../actions/deleteUserAction';
import { fetchUsers } from '../actions/fetchUserAction';

class AdminPanel extends Component {
  componentWillMount() {
    // const hideAdmin = document.getElementById('admin');
    // hideAdmin.classList.add('hide')
    document.title = 'Admin panel'
    this.props.fetchBusinesses();
    this.props.fetchUsers();
  }

  constructor(props){
    super(props);

    this.state = {
      isHidden: false,
      isUsersHidden: false,
      isBusinessesHidden: false,
    };

    this.handleVisibility = this.handleVisibility.bind(this);
    this.userVisibility = this.userVisibility.bind(this);
    this.businessVisibility = this.businessVisibility.bind(this);
  }

  handleVisibility() {
    this.setState((prevState) => {
      return {
        isHidden: !prevState.isHidden
      }
    })
  }

  userVisibility() {
    this.setState((prevState) => {
      return {
        isUsersHidden: !prevState.isUsersHidden
      }
    })
  }

  businessVisibility() {
    this.setState((prevState) => {
      return {
        isBusinessesHidden: !prevState.isBusinessesHidden
      }
    })
  }

  render() {
    const { businesses, deleteBusiness, deleteUser } = this.props;
    return (
      <div>
        <Navbar />
        <FlashMessagesList />
        <div className="dashboard-heading">
          <h4>Welcome {getName()}!</h4>

        </div>

        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.handleVisibility}>
          {this.state.isHidden ? 'Hide permission' : 'Show permission'}
        </button>
        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.userVisibility}>
          {this.state.isUsersHidden ? 'Hide users' : 'Show users'}
        </button>
        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.businessVisibility}>
          {this.state.isBusinessesHidden ? 'Hide businesses' : 'Show businesses'}
        </button>

        {this.state.isHidden && (
          <div className="card dashboard-card ">
            <div className="card-body">
              <h5 className="card-title textcase">Hi {getName()}!</h5>
              <p className="card-text">You have the permission to perform the following.</p>
              <ul>
                <li>Delete a business</li>
                <li>Delete reviews</li>
                <li>Delete users</li>
              </ul>
            </div>
          </div>
        )}

        {this.state.isBusinessesHidden &&
          (<BusinessList businesses={businesses} deleteBusiness={deleteBusiness}/>)
        }

        {this.state.isUsersHidden &&
          (<UserList users={this.props.users}  deleteUser={deleteUser}/>)
        }

        <Footer />
      </div>
    );
  }
}

AdminPanel.propTypes = {
  businesses: PropTypes.array.isRequired,
  fetchBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
    users: state.users,
  }
}

export default connect(mapStateToProps, { fetchBusinesses, fetchUsers, deleteBusiness, deleteUser })(AdminPanel);
