import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UserCard({ user, deleteUser }) {
  return (
    <div className="col-sm-12 col-md-4 col-lg-4">
      <div class="card business-card">
        <div class="text-center bg-transparent"><h5 className="card-title">{user.username}</h5></div>
        <div className="card-body text-center bg-transparent">
          <button className="dropdown-item" onClick={() => deleteUser(user.id)}><i className="fa fa-trash fa-lg"></i> delete</button>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
}
