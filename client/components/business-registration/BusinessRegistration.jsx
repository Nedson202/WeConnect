import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import { businessRegistrationRequest } from '../../actions/businessRegistrationAction';
import { businessUpdateRequest } from '../../actions/businessUpdateAction';
import { addFlashMessage } from '../../actions/flashMessages';
import { fetchCategories } from '../../actions/fetchCategoryAction';
import { fetchBusinessById } from '../../actions/fetchBusinessByIdAction';

class BusinessRegistration extends Component {
  render() {
    const { businessRegistrationRequest, businessUpdateRequest, addFlashMessage, business, fetchBusinessById, params } = this.props;
    return (
      <div>
        <Navbar />
        <RegistrationForm businessRegistrationRequest={businessRegistrationRequest} businessUpdateRequest={businessUpdateRequest} addFlashMessage={addFlashMessage}
          business={business} fetchBusinessById={fetchBusinessById} params={params}/>
        <Footer />
      </div>
    );
  }
}

BusinessRegistration.propTypes = {
  business: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  businessRegistrationRequest: PropTypes.func.isRequired,
  businessUpdateRequest: PropTypes.func.isRequired,
  fetchBusinessById: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  const params = props.match.params;
  if(params.id) {
    return {
      business: state.businesses[0],
      params: params
    }
  } else {
    return {
      business: null
    }
  }
}

export default connect(mapStateToProps, { businessRegistrationRequest, businessUpdateRequest, addFlashMessage, fetchBusinessById })(BusinessRegistration);
