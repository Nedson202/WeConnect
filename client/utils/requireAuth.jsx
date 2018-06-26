import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenVerifier from './tokenVerifier';
import { logout } from '../actions/loginActions';
import addFlashMessage from '../actions/flashMessages';

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

      if(!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Access denied, you need to login'
        });
        this.props.logout();
        this.context.router.history.push('/login');
      }

      if(this.props.isAuthenticated && this.props.user.username === 'admin') {
        this.props.addFlashMessage({
          type: 'error',
          message: 'Access denied, operation is unathorised for an admin'
        });
        this.context.router.history.push('/adminpanel');
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
  logout: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

Authenticate.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  addFlashMessage
}, dispatch);

return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
