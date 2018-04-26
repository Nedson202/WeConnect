import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard.jsx';

class UserList extends Component {
  render() {
    const { users, deleteUser } = this.props;

    const noUser = (
      <h4 className="text-center">No user registered yet</h4>
    );

    const userList = (
      <div className="row">
        { users.map(user => <UserCard user={user} deleteUser={deleteUser} key={user._id} />)}
      </div>
    );

    return (
      <div>
        <div className="container card-container">
          {users.length === 0 ? noUser : userList}
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
}

export default UserList;
