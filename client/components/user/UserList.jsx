import React from 'react';
import UserCard from './UserCard';

/**
   * @description Creates users list.
   * @param {prop} users
   * @param {prop} deleteUser 
   * @returns {object} JSX object
   * @memberof UserList
   */
const UserList = ({users, deleteUser}) => {

  const noUser = (
    <h4 className="text-center">No user registered yet</h4>
  );

  const userList = (
    <div className="row">
      { users.map(user => <UserCard user={user} deleteUser={deleteUser} key={user.id} />)}
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

export default UserList
