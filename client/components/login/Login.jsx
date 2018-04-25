import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import LoginForm from './LoginForm.jsx';
import { userLoginRequest } from '../../actions/loginActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Login extends Component {
  componentDidMount() {
    document.title = 'WeConnect Login'
  }

  render() {
    const { userLoginRequest, addFlashMessage } = this.props;
    return (
      <div>
        <Navbar />
        <LoginForm userLoginRequest={userLoginRequest} addFlashMessage={addFlashMessage}/>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userLoginRequest, addFlashMessage })(Login);
