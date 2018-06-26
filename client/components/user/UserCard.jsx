import React from 'react';

/**
 * @description react stateless component for card template
 * @return {Object} action dispatched by the action creator
 */
export default function UserCard({ user, deleteUser }) {
  return (
    <div className="col-sm-12 col-md-4 col-lg-4">
      <div className="card business-card" style={{ height: '100px'}}>
        <div className="text-center bg-transparent"><h5 className="card-title">{user.username}</h5></div>
        <div className="card-body text-center bg-transparent">
          <button className="dropdown-item" onClick={() => deleteUser(user.id)}><i className="fa fa-trash fa-lg" /> delete</button>
        </div>
      </div>
    </div>
  );
}
