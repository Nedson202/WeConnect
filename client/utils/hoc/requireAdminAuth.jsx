import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import addFlashMessage from '../../actions/flashMessages';
import tokenVerifier from '../tokenVerifier';
import { logout } from '../../actions/userActions';

/**
 * @description Deletes business from the database
 *
 * @param {any} ComposedComponent
 *
 * @returns {undefined}
 *
 * @memberof Authenticate
 */
export default function (ComposedComponent) {
  /**
   * @class Authenticate
   *
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     * @description Retrieve business fetched
     *
     * @param {any} nextProps
     *
     * @returns {undefined}
     *
     * @memberof Authenticate
     */
    componentWillMount() {
      const { history } = this.context.router;
      if (tokenVerifier(localStorage.getItem('accessToken'))) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Access denied, you need to login'
        });
        this.props.logout();
        history.push('/login');
      }
      if (this.props.isAuthenticated && this.props.user.username !== process.env.ADMIN) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Access denied, you are not an admin'
        });
        history.push('/login');
      }
    }

    /**
   * @description Retrieve business fetched
   *
   * @param {any} nextProps
   *
   * @returns {undefined}
   *
   * @memberof Authenticate
   */
    componentWillUpdate(nextProps) {
      const { history } = this.context.router;
      if (!nextProps.isAuthenticated) {
        history.push('/');
      }
    }

    /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof Authenticate
   */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    addFlashMessage,
    logout
  }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
