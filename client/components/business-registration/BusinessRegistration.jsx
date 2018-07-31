import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from './RegistrationForm';
import { businessRegistrationRequest, businessUpdateRequest } from '../../actions/businessRegistrationAction';
import { fetchBusinessById, fetchLocations, fetchCategories } from '../../actions/fetchActions';
/**
 * @class BusinessRegistration
 *
 * @extends {Component}
 */
export class BusinessRegistration extends Component {
  /**
   * @description Creates an instance of RegistrationForm.
   *
   * @param {object} props
   *
   * @memberof RegistrationForm
   */
  constructor(props) {
    super(props);
    const { business } = this.props;

    this.state = {
      name: business ? business.name : '',
      email: business ? business.email : '',
      address: business ? business.address : '',
      location: business ? business.location : '',
      category: business ? business.category : '',
      description: business ? business.description : '',
      errors: {},
      changeValue: 0,
      defaultTotal: 250,
      color: 'red'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.mapCategories = this.mapCategories.bind(this);
    this.mapLocations = this.mapLocations.bind(this);
  }
  /**
   * @description Fetch business locations and categories
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
   * @description Fetch business by it's id
   *
   * @returns {undefined}
   *
   * @memberof RegistrationForm
   */
  componentDidMount() {
    const { params } = this.props;
    if (!params) {
      return null;
    }
    this.props.fetchBusinessById(params.id);
  }

  /**
   * @description Retrieve business
   *
   * @param {any} nextProps
   *
   * @returns {undefined}
   *
   * @memberof RegistrationForm
   */
  componentWillReceiveProps(nextProps) {
    if (!this.props.params.id) {
      return null;
    }
    if (nextProps.business) {
      const {
        name, email, address, location, category, description
      } = nextProps.business;
      this.setState({
        name,
        email,
        address,
        location,
        category,
        description
      });
    }
  }

  /**
   * @description Handles input value
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof RegistrationForm
   */
  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === 'description') {
      this.setState({ changeValue: value.length });
    }

    if (name === 'description' && value.length > 29) {
      this.setState({ color: 'white' });
    }

    if (name === 'description' && value.length > 250) {
      this.setState({ color: 'red' });
    }
  }

  /**
   * @description Handles submission of form data
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof RegistrationForm
   */
  onSubmit(event) {
    event.preventDefault();
    const { history } = this.props;

    if (!this.props.params.id) {
      this.props.businessRegistrationRequest(this.state, history);
    } else {
      this.props.businessUpdateRequest(this.props.params.id, this.state, history);
    }
  }
  /**
   * @description Handles mapping of business locations
   *
   * @param {any} event
   *
   * @returns {undefined}
   */
  mapCategories() {
    if (this.props.categories) {
      const categoryOption = this.props.categories.map(({ id, category }) =>
        <option key={id} value={category}>{category}</option>);
      return categoryOption;
    }
  }
  /**
   * @description Handles mapping of business locations
   *
   * @param {any} event
   *
   * @returns {undefined}
   */
  mapLocations() {
    if (this.props.locations) {
      const locationOption = this.props.locations.map(({ id, location }) =>
        <option key={id} value={location}>{location}</option>);
      return locationOption;
    }
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
      params,
      isLoading
    } = this.props;

    const {
      state,
      onChange,
      onSubmit,
      mapCategories,
      mapLocations
    } = this;

    const { changeValue, defaultTotal, color } = state;

    return (
      <div>
        <div id="background-image" />
        <RegistrationForm
          params={params}
          categories={mapCategories}
          locations={mapLocations}
          state={state}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          changeValue={changeValue}
          defaultTotal={defaultTotal}
          color={color}
        />
      </div>
    );
  }
}

BusinessRegistration.propTypes = {
  businessRegistrationRequest: PropTypes.func.isRequired,
  businessUpdateRequest: PropTypes.func.isRequired,
  fetchBusinessById: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  business: PropTypes.object,
  params: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

BusinessRegistration.defaultProps = {
  business: {}
};

const mapStateToProps = (state, props) => {
  let { params } = props.match;
  params = params || {};
  const { businesses, isLoading } = state;
  if (params.id) {
    return {
      business: businesses.business,
      params,
      categories: businesses.categories,
      locations: businesses.locations,
      isLoading
    };
  }
  return {
    business: null,
    categories: businesses.categories,
    locations: businesses.locations,
    isLoading,
    params: {}
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  businessRegistrationRequest,
  businessUpdateRequest,
  fetchBusinessById,
  fetchLocations,
  fetchCategories,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRegistration);
