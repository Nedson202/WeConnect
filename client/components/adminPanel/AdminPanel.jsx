import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserList from '../user/UserList';
import BusinessList from '../common/BusinessList';
import '../../index.scss';
import { deleteBusiness, deleteUser } from '../../actions/deleteAction';
import { fetchUsers, fetchBusinesses } from '../../actions/fetchActions';
import warning from '../../images/warning.png';

let userToRemove;
/**
 * @class AdminPanel
 *
 * @extends {Component}
 */
export class AdminPanel extends Component {
  /**
   * @description Creates an instance of AdminPanel.
   *
   * @param {object} props
   *
   * @memberof AdminPanel
   */
  constructor(props) {
    super(props);

    this.state = {
      isHidden: false,
      isUsersHidden: false,
      isBusinessesHidden: false,
    };

    this.handleVisibility = this.handleVisibility.bind(this);
    this.userVisibility = this.userVisibility.bind(this);
    this.businessVisibility = this.businessVisibility.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.markUserToRemove = this.markUserToRemove.bind(this);
  }

  /**
   * @description Fetch users and business
   *
   * @returns {undefined}
   *
   * @memberof AdminPanel
   */
  componentWillMount() {
    document.title = 'Admin panel';
    this.props.fetchBusinesses('page=1');
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
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));
  }

  /**
   * @description handle user list toggling
   *
   * @returns {undefined}
   *
   * @memberof AdminPanel
   */
  userVisibility() {
    this.setState(prevState => ({
      isUsersHidden: !prevState.isUsersHidden
    }));
  }

  /**
   * @description handle business list toggling
   *
   * @returns {undefined}
   *
   * @memberof AdminPanel
   */
  businessVisibility() {
    this.setState(prevState => ({
      isBusinessesHidden: !prevState.isBusinessesHidden
    }));
  }
  /**
   * @description handle business list toggling
   *
   * @returns {undefined}
   *
   * @memberof AdminPanel
   */
  removeUser() {
    this.props.deleteUser(userToRemove);
  }
  /**
   * @description Marks user for deletion
   *
   * @param {Number} id
   * @returns {undefined}
   *
   * @memberof AdminPanel
   */
  markUserToRemove(id) {
    userToRemove = id;
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof AdminPanel
   */
  render() {
    const { businesses, paginate, users } = this.props;
    const { username } = this.props.user;
    const {
      handleVisibility, userVisibility, businessVisibility, removeUser, markUserToRemove
    } = this;
    const allBusiness = businesses || [];
    const { isHidden, isUsersHidden, isBusinessesHidden } = this.state;
    return (
      <div>
        <div className="dashboard-heading">
          <h3 className="textcase">Welcome {username}!</h3>
        </div>

        <div id="warning-file" className="text-center">
          <img src={warning} alt="warning file" width="120px" height="150px" />
          <h3>Whatever action is done cannot be reversed!</h3>
        </div>

        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={handleVisibility}>
          {isHidden ? 'Hide permission' : 'Show permission'}
        </button>
        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={userVisibility}>
          {isUsersHidden ? 'Hide users' : 'Show users'}
        </button>
        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={businessVisibility}>
          {isBusinessesHidden ? 'Hide businesses' : 'Show businesses'}
        </button>

        {isHidden && (
          <div className="card dashboard-card ">
            <div className="card-header text-center textcase">
              <h5>Hi {username}!</h5>
            </div>
            <div className="card-body">
              <p className="card-text">You can only do the following.</p>
              <ul>
                <li>Delete a business</li>
                <li>Delete reviews</li>
                <li>Delete users</li>
              </ul>
            </div>
          </div>
        )}

        {isBusinessesHidden &&
          (
            <div>
              { allBusiness.length === 0 ? null :
              <h4 className="text-center">Displaying business list</h4> }
              <BusinessList
                businesses={allBusiness}
                deleteBusiness={this.props.deleteBusiness}
                paginate={paginate}
                fetchBusinesses={this.props.fetchBusinesses}
              />
            </div>)
        }

        {isUsersHidden &&
          (<UserList
            users={users}
            removeUser={removeUser}
            markUserToRemove={markUserToRemove}
          />)
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
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  businesses: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { businesses, users } = state;
  return {
    businesses: businesses.businesses,
    paginate: businesses.paginationResult,
    users: users.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinesses,
  fetchUsers,
  deleteBusiness,
  deleteUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
