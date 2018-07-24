import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/userActions';
// import addFlashMessage from '../../actions/flashMessages';
import loader from '../../actions/loader';

/**
 * @class Signup
 * @extends {Component}
 */
export class Signup extends Component {
  /**
   * @description Creates an instance of SignForm.
   *
   * @param {object} props
   *
   * @memberof SignForm
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Set page document title
   * @returns {undefined}
   * @memberof Signup
   */
  componentDidMount() {
    document.title = 'WeConnect Sign-up';
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
   * @memberof SignForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state, this.props.history);
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
    return (
      <div>
        <div id="background-image" />
        <SignupForm
          userSignupRequest={this.props.userSignupRequest}
          onChange={onChange}
          onSubmit={onSubmit}
          state={state}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  userSignupRequest,
  // addFlashMessage,
  loader
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
