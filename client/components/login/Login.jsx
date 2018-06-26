import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';
import { userLoginRequest } from '../../actions/loginActions';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @class Login
 * 
 * @extends {Component}
 */
class Login extends Component {
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
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof Login
   */
  render() {
    return (
      <div>
        <div id="background-image" />
        <LoginForm 
          userLoginRequest={this.props.userLoginRequest}
          addFlashMessage={this.props.addFlashMessage}   
        />
      </div>
    );
  }
}

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  userLoginRequest,
  addFlashMessage,
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
