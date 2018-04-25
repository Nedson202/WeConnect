import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import SignupForm from './SignupForm.jsx';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Signup extends Component {
  componentDidMount() {
    let login = document.getElementById('signup')
    login.classList.add('hide')
    document.title = 'WeConnect Sign-up'
  }

  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div>
        <Navbar />
        <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
        <Footer />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(Signup);
