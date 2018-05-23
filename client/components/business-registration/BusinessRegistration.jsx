import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from './RegistrationForm';
import businessRegistrationRequest from '../../actions/businessRegistrationAction';
import businessUpdateRequest from '../../actions/businessUpdateAction';
import {addFlashMessage} from '../../actions/flashMessages';
import fetchBusinessById from '../../actions/fetchBusinessByIdAction';
import { fetchLocations, fetchCategories } from '../../actions/fetchLocationsAndCategories';

/**
 * @class BusinessRegistration
 * 
 * @extends {Component}
 */
class BusinessRegistration extends Component {
  /**
   * @description Fetch business by it's id
   * 
   * @returns {undefined}
   * 
   * @memberof RegistrationForm
   */
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchLocations();
  }
  /**
   * @description Renders component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof BusinessRegistration
   */
  render() {
    const {
      business,
      params,
      categories,
      locations
    } = this.props;

    return (
      <div>
        <RegistrationForm
          businessRegistrationRequest={this.props.businessRegistrationRequest}
          businessUpdateRequest={this.props.businessUpdateRequest}
          addFlashMessage={this.props.addFlashMessage}
          business={business}
          fetchBusinessById={this.props.fetchBusinessById}
          params={params} 
          categories={categories}
          locations={locations}
        />
      </div>
    );
  }
}

BusinessRegistration.propTypes = {
  businessRegistrationRequest: PropTypes.func.isRequired,
  businessUpdateRequest: PropTypes.func.isRequired,
  fetchBusinessById: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const { params } = props.match;
  if (params.id) {
    return {
      business: state.businesses[0],
      params,
      categories: state.categories,
      locations: state.locations
    };
  }
  return {
    business: null,
    categories: state.categories,
    locations: state.locations
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  businessRegistrationRequest,
  businessUpdateRequest,
  addFlashMessage,
  fetchBusinessById,
  fetchLocations,
  fetchCategories
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRegistration);
