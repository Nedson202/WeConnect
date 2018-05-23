import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classcat from 'classcat';
import TextField from '../common/TextField'
import  passwordToggler from '../../utils/passwordToggler';
import '../../index.scss';

/**
 * @class SignForm
 * 
 * @extends {Component}
 */
class SignupForm extends Component {
  /**
   * @description Creates an instance of SignForm.
   * 
   * @param {object} props 
   * 
   * @memberof SignForm
   */
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Handle input change and updates state
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof SignForm
   */
  onChange(event) {
    if (this.state.errors[event.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value,
        errors
      });
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  
  /**
   * @description Handles form submission to database
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof SignForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });

    this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            message: `You signed up successfully. welcome ${this.state.username}!`
          })
          this.context.router.history.push('/dashboard');
        },
        (error) => this.setState({ errors: error.response.data, isLoading: false })
      ) 
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof SignForm
   */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="custom-form-style signup-form-style">
            <h3 className="text-center form-header">Sign Up</h3>
            <h4 className="text-center">
              {errors && <span className="help-block unauthorised-message">{errors.conflict}</span>}
            </h4>
            <TextField
              error={errors.username}
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              field="username"
              placeholder="Username"
            />
            <TextField
              error={errors.email}
              label="Email address"
              onChange={this.onChange}
              value={this.state.email}
              type="email"
              field="email"
              placeholder="Email e.g youremail@example.com"
            />
            <div className={classcat(["form-group",
              { "has-error": errors.password },
                "col-md-6", "offset-md-3", "col-lg-8", "offset-lg-2",
              ])}
            >
              <label 
                id="control-label"
              >Password
              </label>
              <input
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password"
                id="password" 
                className="form-control" 
                placeholder="password"
              />
              <div className="input-group-btn">
                <li className="btn btn-default" onClick={passwordToggler()}>
                  <i className="fa fa-eye" aria-hidden="true" id="add-hide" />
                  <i className="fa fa-eye-slash hide" aria-hidden="true" id="remove-hide" />
                </li>
              </div>
              {errors && <span className="help-block">{errors.password}</span>}
            </div>
            <button
              disabled={isLoading}
              className="btn btn-outline-success"
              type="submit"
              id="submit-button"
            >{isLoading ? (
              <span>
                processing 
                <i className="fa fa-spinner fa-spin" />
              </span>) : <span>Sign up</span>}
            </button>
            <p className="text-center account-block">Have an account? &nbsp; <Link to="/login" className="link">Sign In</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm;
