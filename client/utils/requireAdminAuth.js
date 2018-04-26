import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setAuthToken from '../utils/setAuthToken';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if(!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          message: 'Access denied, you need to first login'
        });
        this.context.router.history.push('/login');
      }

      if(this.props.isAuthenticated && this.props.user.username !== 'admin') {
        this.props.addFlashMessage({
          type: 'error',
          message: 'Access denied, you are not an admin'
        });
        this.context.router.history.push('/login');
      }

      else {
        this.context.router.history.push('/adminpanel');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }

    render(){
      return(
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    }
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
