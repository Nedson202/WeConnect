import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import addFlashMessage from '../actions/flashMessages';
import tokenVerifier from './tokenVerifier';
import { logout } from '../actions/loginActions';

/**
 * @description Deletes business from the database
 * 
 * @param {any} ComposedComponent
 * 
 * @returns {undefined}
 * 
 * @memberof Authenticate
 */
export default function(ComposedComponent) {
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
      if(tokenVerifier(localStorage.getItem('accessToken'))) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Access denied, you need to login'
        });
        this.props.logout();
        this.context.router.history.push('/login');
      }

      // if(!this.props.isAuthenticated) {
      //   this.props.addFlashMessage({
      //     type: 'error',
      //     message: 'Access denied, you need to first login'
      //   });
      //   this.context.router.history.push('/login');
      // }

      if(this.props.isAuthenticated && this.props.user.username !== 'admin') {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Access denied, you are not an admin'
        });
        this.context.router.history.push('/login');
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
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }

    /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof Authenticate
   */
    render(){
      return(
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

 const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    }
  }

 const mapDispatchToProps = dispatch => bindActionCreators({
   addFlashMessage,
   logout
 }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
