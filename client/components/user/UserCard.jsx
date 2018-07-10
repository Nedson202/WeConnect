import React from 'react';
import PropTypes from 'prop-types';
/**
 * @description react stateless component for card template
 * @return {Object} action dispatched by the action creator
 */
export default function UserCard({ user, removeUser, markUserToRemove }) {
  const { username, id } = user;
  return (
    <div className="col-sm-12 col-md-4 col-lg-4">
      <div className="card business-card" style={{ height: '130px' }}>
        <div className="card-header text-center textcase">
          <h5>{username}</h5>
        </div>
        <div className="card-body text-center bg-transparent">
          <button
            className="btn btn-outline-success text-danger"
            data-toggle="modal"
            data-target="#confirmDeleteModal"
            onClick={() => markUserToRemove(id)}
          ><i className="fa fa-trash fa-lg" />
          </button>
        </div>
      </div>

      <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h4>Are you sure?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" data-dismiss="modal">No</button>
              <button type="button" className="btn btn-outline-success" onClick={() => removeUser()} data-dismiss="modal">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  removeUser: PropTypes.func.isRequired,
  markUserToRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
