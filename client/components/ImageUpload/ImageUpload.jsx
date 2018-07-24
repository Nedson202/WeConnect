import React from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';

/**
 * @class ImageUpload
 *
 * @extends {Component}
 */
const ImageUploader = ({ onImageChange, state }) => (
  <div>
    <div className="row col-lg-12">
      <div className="form-group col-lg-6">
        <label className="btn btn-default" id="upload-form-label">
          { state.uploading ? <div
            className="progress form-progress-bar"
            id="progress"
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: '100%' }}
            />
          </div> : null }
          <div><img
            src=""
            className="hide"
            id="show-image"
            height="100px"
            width="130px"
            alt="Avatar"
          />
            <div id="dropzone">
              <i className="fa fa-picture-o fa-3x" aria-hidden="true" />
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
      </div>
    </div>
  </div>
);

ImageUploader.propTypes = {
  onImageChange: PropTypes.func.isRequired
};

export default ImageUploader;
