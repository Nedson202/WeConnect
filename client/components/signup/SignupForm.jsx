import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import passwordToggler from '../../utils/passwordToggler';
import '../../index.scss';

/**
 * @class SignForm
 *
 * @extends {Component}
 */
const SignupForm = ({
  state, onChange, onSubmit, isLoading
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <div className="custom-form-style signup-form-style">
        <h3 className="text-center form-header">Sign Up</h3>
        <TextField
          label="Username"
          onChange={onChange}
          value={state.username}
          field="username"
          placeholder="Username"
          type="text"
        />
        <TextField
          label="Email address"
          onChange={onChange}
          value={state.email}
          type="email"
          field="email"
          placeholder="Email e.g youremail@example.com"
        />
        <div className="form-group col-md-6 offset-md-3 col-lg-8 offset-lg-2">
          <label
            id="control-label"
          >Password
          </label>
          <input
            value={state.password}
            onChange={onChange}
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
        >{isLoading ? (
          <span>
              processing
            <i className="fa fa-spinner fa-spin" />
          </span>) : <span><i className="fa fa-paper-plane" />&nbsp; Sign up</span>}
        </button>
        <p className="text-center account-block">Have an account? &nbsp; <Link to="/login" className="link">Sign In</Link></p>
      </div>
    </form>
  </div>
);

SignupForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SignupForm;
