import React, { Component } from 'react';
import classcat from 'classcat';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUpload from './ImageUpload';
import ImageUploader from '../actions/imageUpload';
import {addFlashMessage} from '../actions/flashMessages';
import '../index.scss';

/**
 * @class UserProfileUpdate
 * 
 * @extends {Component}
 */
class UserProfileUpdate extends Component {
  /**
   * @description Creates an instance of UserProfileUpdate.
   * 
   * @param {object} props 
   * 
   * @memberof UserProfileUpdate
   */
  constructor(props){
    super(props);

    this.state = {
      username: this.props.user ? this.props.user.username : "",
      email: this.props.user ? this.props.user.email : "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description update state with data from input
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof UserProfileUpdate
   */
  onChange(event) {
    if (this.state.errors[event.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value.toLowerCase(),
        errors
      });
    }
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description handle submission of profile
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof UserProfileUpdate
   */
  onSubmit(event) {
    event.preventDefault();    
    this.props.userProfileUpdateRequest(this.props.user.userId, this.state).then(
      () => {
        document.getElementById('close').click();        
      }
    )
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof UserProfileUpdate
   */
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Edit profile</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row"> 
                    <div className={classcat(["form-group",
                        { "has-error": errors.username },
                        'col-lg-12'
                      ])}
                    >
                      <label  id="control-label">Username</label>
                      <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                        id="control-label"
                        placeholder="username"
                      />
                      {errors && <span className="help-block">{errors.username}</span>}
                    </div>
                    <div className={classcat(["form-group",
                        { "has-error": errors.email },
                        'col-lg-12'
                      ])}
                    >
                      <label  id="control-label">Email</label>
                      <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                        id="control-label"
                        placeholder="email"
                      />
                      {errors && <span className="help-block">{errors.email}</span>}
                    </div>
                    <ImageUpload 
                      ImageUploader={this.props.ImageUploader} 
                      user={this.props.user} 
                      addFlashMessage={this.props.addFlashMessage}
                    />      
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-success" data-dismiss="modal">No</button>
                <button 
                  type="button" 
                  className="btn btn-outline-success" 
                  onClick={this.onSubmit} 
                  data-dismiss="modal"
                >Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfileUpdate.propTypes = {
  ImageUploader: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ImageUploader,
  addFlashMessage
}, dispatch)

export default connect(null, mapDispatchToProps)(UserProfileUpdate);