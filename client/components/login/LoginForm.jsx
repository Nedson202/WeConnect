import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import FlashMessagesList from '../flash/FlashMessagesList';
import validateForm from '../../../server/validation/login';
import TextField from '../common/TextField';
import '../../index.css';

class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
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
      this.props.userLoginRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            message: `You logged in successfully. welcome ${this.state.username}!`
          })
          if(this.state.username !== 'admin') {
            this.context.router.history.push('/dashboard');
          } else {
            this.context.router.history.push('/adminpanel');
          }
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false }),
        (unauthorised) => this.setState({ errors: unauthorised.error.message, isLoading: false })
      )
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <FlashMessagesList />
        <form onSubmit={this.onSubmit}>
          <div className="custom-form-style">
            <TextField
              error={errors.username}
              conflictError={errors.message}
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              field="username"
              placeholder="Username"
            />
            <TextField
              error={errors.password}
              conflictError={errors.message}
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              type="password"
              field="password"
              placeholder="Password"
            />
            <button class="btn btn-outline-success" type="submit" id="submit-button">Login</button>
            <p className="text-center account-block">don't have an account? <Link to="/signup">signup</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router:PropTypes.object.isRequired
}

export default LoginForm;
