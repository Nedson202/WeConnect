import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import validateForm from '../../../server/validation/signup';
import TextField from '../common/TextField'
import '../../index.css';

class SignupForm extends Component {
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

  onChange(e) {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateForm(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            message: `You signed up successfully. welcome ${this.state.username}!`
          })
          this.context.router.history.push('/dashboard');
        },
        (data) => this.setState({ errors: data.response, isLoading: false }),
        (error) => this.setState({ errors: error.data.response.data, isLoading: false }),
      )
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="custom-form-style">
            <TextField
              error={errors.username}
              conflictError={errors.usernameConflict}
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              field="username"
              placeholder="Username"
            />
            <TextField
              error={errors.email}
              conflictError={errors.emailConflict}
              label="Email address"
              onChange={this.onChange}
              value={this.state.email}
              type="email"
              field="email"
              placeholder="Email e.g youremail@example.com"
            />
            <TextField
              error={errors.password}
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              type="password"
              field="password"
              placeholder="Password"
            />
          <button disabled={isLoading} className="btn btn-outline-success"
            type="submit" id="submit-button">{isLoading ? (<span>
            processing <i class="fa fa-spinner fa-spin"></i></span>) : <span>Sign up</span>}</button>
          <p className="text-center account-block">have an account? <Link to="/login" className="link">login</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm;
