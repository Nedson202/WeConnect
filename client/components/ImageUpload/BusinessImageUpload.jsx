import React from 'react';
import PropTypes from 'prop-types';
// import firebaseApp from '../../utils/firebaseConfig';
import '../../index.scss';
/**
 * @class BusinessImageUpload
 *
 * @extends {Component}
 */
const BusinessImageUpload = ({ onImageChange, onImageSubmit }) => (
  <div>
    <div className="modal fade" id="businessImageModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Edit Image</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close-btn">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row col-lg-12">
              <div className="col-lg-6">
                <label className="btn btn-default">
                  <div
                    className="progress form-progress-bar hide"
                    id="progress"
                  >
                    <div
                      className="progress-bar  progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="circle"><img
                    src=""
                    className="hide"
                    id="show-image"
                    height="130px"
                    width="160px"
                    alt="Avatar"
                  />
                    <div id="dropzone">
                      <i className="fa fa-picture-o fa-3x text-center" aria-hidden="true" />
                      <p>choose image</p>
                    </div>

                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={onImageChange}
                    hidden
                  />
                </label>
              </div>
              <div className="col-lg-4">
                <h4 className="hide text-center" id="upload-info">You have to click the upload button to finish</h4>
                <button
                  onClick={onImageSubmit}
                  className="btn btn-outline-success"
                  id="profile-update-button"
                >upload image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

BusinessImageUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  onImageSubmit: PropTypes.func.isRequired,
};

export default BusinessImageUpload;
