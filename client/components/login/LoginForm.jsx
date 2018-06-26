import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import passwordToggler from '../../utils/passwordToggler';
import '../../index.scss';

/**
 * @class LoginForm
 *
 * @extends {Component}
 */
class LoginForm extends Component {
  /**
   * @description Creates an instance of LoginForm.
   *
   * @param {object} props
   *
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
   * @memberof LoginForm
   */
  onChange(event) {
    if (this.state.errors[event.target.name]) {
      const errors = Object.assign({}, this.state.errors);
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
   * @memberof LoginForm
   */
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();

    this.setState({ errors: {}, isLoading: true });

    this.props.userLoginRequest(this.state).then(
      () => {
         
        // toastr.success(`Login successful. welcome ${this.state.username}!`);
        this.props.addFlashMessage({
          type: 'success',
          text: `Login successful. welcome ${this.state.username}!`
        })
        if (this.state.username !== 'admin') {
          this.context.router.history.push('/dashboard');
        } else {
          this.context.router.history.push('/adminpanel');
        }
      },
      (err) => {
        this.setState({ errors: err.response.data, isLoading: false });
        this.state.errors.map(error => this.props.addFlashMessage({
          type: 'error',
          text: error
        }));
        // toastr.error(error)
      }
    ).catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Login could not be completed'
      });
      // toastr.error('Login could not be completed')
      this.setState({ isLoading: false });
    });
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof LoginForm
   */
  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {/* <FlashMessagesList /> */}
        <form onSubmit={this.onSubmit}>
          <div className="custom-form-style">
            <h3 className="text-center form-header">Login</h3>
            <TextField
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              field="username"
              placeholder="Username"
              type="text"
            />
            <div className="form-group col-md-6 offset-md-3 col-lg-8 offset-lg-2">
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
            </div>
            <button
              disabled={isLoading}
              className="btn btn-outline-success"
              type="submit"
              id="submit-button"
            >
              {isLoading ? (
                <span className="processing-info">
                  processing
                  <i className="fa fa-spinner fa-spin" />
                </span>) : <span>Login</span>}
            </button>
            <p className="text-center account-block">Don&apos;t have an account? &nbsp;
              <Link to="/signup" className="link">signup</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginForm;
