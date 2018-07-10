import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';
import { userLoginRequest } from '../../actions/userActions';
import addFlashMessage from '../../actions/flashMessages';
import loader from '../../actions/loader';

/**
 * @class Login
 *
 * @extends {Component}
 */
class Login extends Component {
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
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Set page document title
   *
   * @returns {undefined}
   *
   * @memberof Login
   */
  componentDidMount() {
    document.title = 'WeConnect Login';
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
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    const { history } = this.props;

    this.props.userLoginRequest(this.state, history);
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof Login
   */
  render() {
    const { state, onChange, onSubmit } = this;
    const { isLoading } = this.props;
    return (
      <div>
        <div id="background-image" />
        <LoginForm
          userLoginRequest={this.props.userLoginRequest}
          addFlashMessage={this.props.addFlashMessage}
          onChange={onChange}
          onSubmit={onSubmit}
          state={state}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { isLoading, authError } = state;
  return {
    isLoading,
    error: authError
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  userLoginRequest,
  addFlashMessage,
  loader
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
