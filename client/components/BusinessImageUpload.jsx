import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import businessImageUploader from '../actions/businessImageUpload';
import firebaseApp from '../utils/firebaseConfig';
import '../index.scss';

// const config = {
//   apiKey: "AIzaSyBnRKH-tpjGoHJfGtuXxR7qk6e3gZbQNvc",
//   authDomain: "weconnect-image.firebaseapp.com",
//   databaseURL: "https://weconnect-image.firebaseio.com",
//   projectId: "weconnect-image",
//   storageBucket: "weconnect-image.appspot.com",
//   messagingSenderId: "465125394331"
// };
  // firebase.initializeApp(firebaseConfig());

/**
 * @class BusinessImageUpload
 * 
 * @extends {Component}
 */
class BusinessImageUpload extends Component {
  /**
   * @description Creates an instance of BusinessImageUpload.
   * 
   * @param {object} props 
   * 
   * @memberof BusinessImageUpload
   */
  constructor(props){
    super(props);

    this.state = {
      image: "",
      progress: 0,      
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Handles image upload to firebase
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof ImageUpload
   */
  onChange(event) {
    this.setState({ image : '', progress: 0 });

    let hideProgress = document.getElementById('progress');
    hideProgress.classList.remove('hide');
    let showButton = document.getElementById('show-upload-button');
    showButton.classList.add('hide');

    const imageUpload = firebaseApp.child(
      `images/${new Date().getTime()}`
    ).put(event.target.files[0]);

    imageUpload.on('state_changed',
      (snapshot) => {
        const progress = `${Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)}%`;
        this.setState({ progress })

        if(this.state.progress === '100%') {
          hideProgress = document.getElementById('progress');
          hideProgress.classList.add('hide');
        }
      }
    );

    imageUpload.then(snapshot => {
      const url = snapshot.downloadURL;
      this.setState({ image: url });
      document.getElementById('show-image').src = url;
      document.querySelector('img').src = url;

      localStorage.setItem('image', url);

      const hideIclass = document.getElementById('dropzone');
      hideIclass.classList.add('hide');
      showButton = document.getElementById('show-upload-button');
      showButton.classList.remove('hide');
      const showImage = document.getElementById('show-image');
      showImage.classList.remove('hide');
    })
  }

  /**
   * @description Handles image url submission to database
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof ImageUpload
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.businessImageUploader(this.props.params.id, this.state)
    .then(
      () => {
        document.getElementById('close').click();
      }
    );
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof BusinessImageUpload
   */
  render() {
    const { progress } = this.state;

    return (
      <div>
        <div className="modal fade" id="businessImageModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Edit Image</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row col-lg-12">   
                  <div className="col-lg-8">
                    <label className="btn btn-default">
                      <div className="progress form-progress-bar" id="progress">
                        <div
                          className="progress" 
                          role="progressbar"
                          aria-valuenow={progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progress }}
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
                        onChange={this.onChange}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="col-lg-2">
                    <button 
                      onClick={this.onSubmit} 
                      className="btn btn-outline-success hide"
                      id="show-upload-button"
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
  }
}

BusinessImageUpload.propTypes = {
  businessImageUploader: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators({
  businessImageUploader
}, dispatch)

export default connect(null, mapDispatchToProps)(BusinessImageUpload);