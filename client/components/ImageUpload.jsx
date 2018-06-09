import React, { Component } from 'react';
import firebaseApp from '../utils/firebaseConfig';
import '../index.scss';

/**
 * @class ImageUpload
 * 
 * @extends {Component}
 */
class ImageUploader extends Component {
  /**
   * @description Creates an instance of ImageUpload.
   * 
   * @param {object} props 
   * 
   * @memberof Profile
   */
  constructor(props){
    super(props);

    this.state = {
      image: '',
      progress: 0,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    this.props.imageUploader(this.props.user.userId, this.state)
    .then(
      () => {
        localStorage.setItem('image', this.state.image);
        this.props.addFlashMessages({
          type: 'success',
          text: 'Image uploaded successfully'
        })
      }
    );
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof imageUpload
   */
  render() {
    const { progress } = this.state;

    return (
      <div>
        <div className="row col-lg-12">   
          <div className="form-group col-lg-8">
            <label className="btn btn-default">
              <div 
                className="progress form-progress-bar" 
                id="progress" 
              >
                <div
                  className="progress-bar" 
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
    );
  }
}

export default ImageUploader;