import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from './SignupForm';
import userSignupRequest from '../../actions/signupActions';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   * @description Set page document title
   * @returns {undefined}
   * @memberof Signup
   */
  componentDidMount() {
    document.title = 'WeConnect Sign-up';
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
        <SignupForm
          userSignupRequest={this.props.userSignupRequest}
          addFlashMessage={this.props.addFlashMessage}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  userSignupRequest,
  addFlashMessage
}, dispatch);

export default connect(null, mapDispatchToProps)(Signup);
