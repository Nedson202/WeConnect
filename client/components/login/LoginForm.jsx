import React from 'react';
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
const LoginForm = ({
  state, onChange, onSubmit, isLoading
}) => {
  const { username, password } = state;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="custom-form-style">
          <h3 className="text-center form-header">Login</h3>
          <TextField
            label="Username"
            onChange={onChange}
            value={username}
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
              value={password}
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
          >
            { isLoading ? (
              <span className="processing-info">
                  processing <i className="fa fa-spinner fa-spin" />
              </span>) : <span><i className="fa fa-paper-plane" />&nbsp; Login</span>}
          </button>
          <p className="text-center account-block">Don&apos;t have an account? &nbsp;
            <Link to="/signup" className="link">signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
