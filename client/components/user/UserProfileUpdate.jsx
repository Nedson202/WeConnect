import React from 'react';
import PropTypes from 'prop-types';
import ImageUpload from '../ImageUpload/ImageUpload';

/**
 * @class UserProfileUpdate
 *
 * @extends {Component}
 */
const UserProfileUpdate = ({
  state, onChange, onSubmit, user, uploadToCloudinary, onImageChange
}) => {
  const { username, email } = state;
  return (
    <div>
      <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Edit profile</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeProfileModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="form-group col-lg-12">
                    <label id="upload-form-label">Username</label>
                    <input
                      value={username}
                      onChange={onChange}
                      type="text"
                      name="username"
                      className="form-control"
                      id="control-label"
                      placeholder="username"
                    />
                  </div>
                  <div className="form-group col-lg-12">
                    <label id="upload-form-label">Email</label>
                    <input
                      value={email}
                      onChange={onChange}
                      type="text"
                      name="email"
                      className="form-control"
                      id="control-label"
                      placeholder="email"
                    />
                  </div>
                  <ImageUpload
                    onImageChange={onImageChange}
                    uploadToCloudinary={uploadToCloudinary}
                    user={user}
                    state={state}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" data-dismiss="modal">No</button>
              <button
                className="btn btn-outline-success"
                onClick={onSubmit}
                id="profile-update-button"
              >Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserProfileUpdate.propTypes = {
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserProfileUpdate;
