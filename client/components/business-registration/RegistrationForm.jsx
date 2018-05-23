import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classcat from 'classcat';

/**
 * @class RegistrationForm
 * 
 * @extends {Component}
 */
class RegistrationForm extends Component {
  /**
   * @description Creates an instance of RegistrationForm.
   * 
   * @param {object} props 
   * 
   * @memberof RegistrationForm
   */
  constructor(props){
    super(props);

    this.state = {
      name: this.props.business? this.props.business.name : '',
      email: this.props.business ? this.props.business.email : '',
      address: this.props.business ? this.props.business.address : '',
      location: this.props.business ? this.props.business.location : '',
      category: this.props.business ? this.props.business.category : '',
      description: this.props.business ? this.props.business.description : '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Fetch business by it's id
   * 
   * @returns {undefined}
   * 
   * @memberof RegistrationForm
   */
  componentDidMount() {
    if(!this.props.params) {
      return null
    }

    this.props.fetchBusinessById(this.props.params.id);
  }

  /**
   * @description Retrieve business fetched
   * 
   * @param {any} nextProps
   * 
   * @returns {undefined}
   * 
   * @memberof RegistrationForm
   */
  componentWillReceiveProps(nextProps) {
    if(!this.props.params) {
      return null
    }

    if(nextProps.business) {
      this.setState({
        name: nextProps.business.name,
        email: nextProps.business.email,
        address: nextProps.business.address,
        location: nextProps.business.location,
        category: nextProps.business.category,
        description: nextProps.business.description,
      })
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
    if (this.state.errors[event.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value.toLowerCase(),
        errors
      });
    }
    this.setState({ [event.target.name]: event.target.value });
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
    this.setState({ errors: {} });
    event.preventDefault();

    this.setState({ errors: {}, isLoading: true });

    if(!this.props.params) {
      this.props.businessRegistrationRequest(this.state).then(
        () => {
          this.context.router.history.push('/dashboard');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false }),
        (conflict) => this.setState({ errors: conflict, isLoading: false })
      )
    } else {
      this.props.businessUpdateRequest(this.props.params.id, this.state).then(
        () => {
          this.context.router.history.push(`/profile/${this.props.business.id}`);
        },
        (conflict) => this.setState({ errors: conflict.response.data, isLoading: false })
      )
    }
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof RegistrationForm
   */
  render() {
    const { errors, isLoading } = this.state;
    const { locations, categories } = this.props;

    const categoryOption = categories.map(({id, category}) =>
      <option key={id} value={category}>{category}</option>
    );

    const locationOption = locations.map(({id, location}) =>
      <option key={id} value={location}>{location}</option>
    );

    /**
     * @description Renders the component to the dom
     *
     * @returns {object} JSX object
     *
     * @memberof RegistrationForm
     */
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="business-form-style">
            <div className="col-lg-12">
              {errors && <span className="help-block">{errors.message1}</span>}
            </div>
            <h3 className="text-center form-header">
              { !this.props.params ? "Register business" : "Update business" }
            </h3>                        
            <div className="row col-lg-12">
              <div className={classcat(["form-group",
                   { "has-error": errors.name },
                     "col-lg-6",
                 ])}
              >
                <label  id="control-label">Business Name</label>
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  className="form-control"
                  id="control-label"
                  placeholder="Business name"
                />
                {errors && <span className="help-block">{errors.name}</span>}
                {errors && <span className="help-block">{errors.businessname}</span>}
              </div>
              <div className={classcat(["form-group",
                   { "has-error": errors.email },
                     "col-lg-6",
                 ])}
              >
                <label  id="control-label">Email address</label>
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  type="email"
                  name="email"
                  id="icon-prefix email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {errors && <span className="help-block">{errors.email}</span>}
              </div>
            </div>
            <div className="row col-lg-12">
              <div className={classcat(["form-group",
                   { "has-error": errors.address },
                     "col-lg-6",
                 ])}
              >
                <label  id="control-label">Address</label>
                <input
                  value={this.state.address}
                  onChange={this.onChange}
                  type="text"
                  name="address"
                  className="form-control"
                  id="control-label"
                  placeholder="Address"
                />
                {errors && <span className="help-block">{errors.address}</span>}
              </div>
              <div className={classcat(["form-group",
                   { "has-error": errors.location },
                     "col-lg-6",
                 ])}
              >
                <label  id="control-label">Location</label>
                <select
                  className="custom-select"
                  type="select"
                  name="location"
                  onChange={this.onChange}
                  value={this.state.location}
                >
                  <option value="" disabled>choose location</option>
                  {locationOption}
                </select>
                {errors && <span className="help-block">{errors.location}</span>}
              </div>
            </div>
            <div className="row col-lg-12">
              <div className={classcat(["form-group",
                   { "has-error": errors.category },
                     "col-lg-6",
                 ])}
              >
                <label  id="control-label">Category</label>
                <select
                  className="custom-select"
                  type="select"
                  name="category"
                  onChange={this.onChange}
                  value={this.state.category}
                >
                  <option value="" disabled>choose category</option>
                  {categoryOption}
                </select>
                {errors && <span className="help-block">{errors.category}</span>}
              </div>
              <div className={classcat(["form-group",
                    { "has-error": errors.description },
                      "col-lg-6",
                  ])}
              >
                <label  id="control-label">Description</label>
                <textarea 
                  value={this.state.description}
                  onChange={this.onChange}
                  type="text"
                  name="description"
                  className="form-control"
                  id="control-label"
                  placeholder="Description"
                  rows="3" 
                />
                {errors && <span className="help-block">{errors.description}</span>}
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success" id="submit-button">
              {isLoading ? <span>processing <i className="fa fa-spinner fa-spin" /></span> : <span>Submit</span>}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

RegistrationForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default RegistrationForm;
