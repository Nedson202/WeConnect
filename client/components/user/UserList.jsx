import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

/**
   * @description Creates users list.
   * @param {prop} users
   * @param {prop} deleteUser
   * @returns {object} JSX object
   * @memberof UserList
   */
const UserList = ({ users, removeUser, markUserToRemove }) => {
  const noUser = (
    <h4 className="text-center">No user registered yet</h4>
  );

  const userList = (
    <div className="row">
      { users.map(user =>
        (<UserCard
          user={user}
          removeUser={removeUser}
          markUserToRemove={markUserToRemove}
          key={user.id}
        />))}
    </div>
  );

  return (
    <div>
      <div className="text-center">
        {users.length === 0 ? null :
        <h4>Displaying user list</h4>
        }
      </div>
      <div className="container card-container">
        {users.length === 0 ? noUser : userList}
      </div>
    </div>
  );
};

UserList.propTypes = {
  removeUser: PropTypes.func.isRequired,
  markUserToRemove: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default UserList;
