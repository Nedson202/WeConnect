import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import FlashMessagesList from './flash/FlashMessagesList';
import UserList from './user/UserList';
import BusinessList from './BusinessList';
import '../index.scss';
import { fetchBusinesses } from '../actions/fetchBusinessAction';
import deleteBusiness from '../actions/deleteBusinessAction';
import deleteUser from '../actions/deleteUserAction';
import fetchUsers from '../actions/fetchUserAction';

/**
 * @class AdminPanel
 * 
 * @extends {Component}
 */
class AdminPanel extends Component {
  /**
   * @description Creates an instance of AdminPanel.
   * 
   * @param {object} props 
   * 
   * @memberof AdminPanel
   */
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

  /**
   * @description Fetch users and business
   * 
   * @returns {undefined}
   * 
   * @memberof AdminPanel
   */
  componentWillMount() {
    document.title = 'Admin panel'
    this.props.fetchBusinesses();
    this.props.fetchUsers();
  }

  /**
   * @description handle toggler for permission
   * 
   * @returns {undefined}
   * 
   * @memberof AdminPanel
   */
  handleVisibility() {
    this.setState((prevState) => {
      return {
        isHidden: !prevState.isHidden
      }
    })
  }

  /**
   * @description handle user list toggling
   * 
   * @returns {undefined}
   * 
   * @memberof AdminPanel
   */
  userVisibility() {
    this.setState((prevState) => {
      return {
        isUsersHidden: !prevState.isUsersHidden
      }
    })
  }

  /**
   * @description handle business list toggling
   * 
   * @returns {undefined}
   * 
   * @memberof AdminPanel
   */
  businessVisibility() {
    this.setState((prevState) => {
      return {
        isBusinessesHidden: !prevState.isBusinessesHidden
      }
    })
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof AdminPanel
   */
  render() {
    const { businesses } = this.props;
    return (
      <div>
        {/* <FlashMessagesList /> */}
        <div className="dashboard-heading">
          <h4>Welcome {this.props.user.username}!</h4>

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
              <h5 className="card-title textcase">Hi {this.props.user.username}!</h5>
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
          (<BusinessList businesses={businesses} deleteBusiness={this.props.deleteBusiness} />)
        }

        {this.state.isUsersHidden &&
          (<UserList users={this.props.users}  deleteUser={this.props.deleteUser} />)
        }
      </div>
    );
  }
}

AdminPanel.propTypes = {
  fetchBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    businesses: state.businesses,
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinesses,
  fetchUsers,
  deleteBusiness,
  deleteUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
