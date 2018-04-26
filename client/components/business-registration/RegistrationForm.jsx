import React, { Component } from 'react';
import businessValidator from '../../../server/validation/business';
import PropTypes from 'prop-types';
import classcat from 'classcat';
import { locations } from '../../select-options/location'
import { categories } from '../../select-options/categories'
import '../../index.css';

class RegistrationForm extends Component {
  componentDidMount() {
    if(!this.props.params) {
      return null
    }

    this.props.fetchBusinessById(this.props.params.id);
  }

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
      })
    }
  }

  constructor(props){
    super(props);

    this.state = {
      name: this.props.business? this.props.business.name : '',
      email: this.props.business ? this.props.business.email : '',
      address: this.props.business ? this.props.business.address : '',
      location: this.props.business ? this.props.business.kocation : '',
      category: this.props.business ? this.props.business.category : '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value.toLowerCase(),
        errors
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = businessValidator(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();

    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      if(!this.props.params) {
        this.props.businessRegistrationRequest(this.state).then(
          () => {
            this.context.router.history.push('/dashboard');
          },
          (err) => this.setState({ errors: err.response.data, isLoading: false }),
          (conflict) => this.setState({ errors: conflict, isLoading: false }),
        )
      } else {
        this.props.businessUpdateRequest(this.props.params.id, this.state).then(
          () => {
            this.context.router.history.push(`/profile/${this.props.business.id}`);
          },
          (conflict) => this.setState({ errors: conflict.response.data, isLoading: false }),
        )
      }
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    // const { categories } = this.props;

    const categoryOptions = categories.map(({id, category}) =>
      <option key={id} value={category}>{category}</option>
    );

    const locationOption = locations.map(({id, location}) =>
      <option key={id} value={location}>{location}</option>
    );

    return (
      <div className="container">
        <div className="business-form-style">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-lg-12">
                {errors && <span className="help-block">{errors.message1}</span>}
              </div>
              <div className="row col-sm-12 col-lg-12">
                <div className={classcat(["form-group",
                   { "has-error": errors.name },
                     "col-lg-6",
                 ])}>
                  <label for="control-label" id="control-label">Business Name</label>
                  <input
                    value={this.state.name}
                    onChange={this.onChange}
                    type="text"
                    name="name"
                    className="form-control"
                    id="control-label" placeholder="Business name"/>
                  {errors && <span className="help-block">{errors.name}</span>}
                  {errors && <span className="help-block">{errors.businessname}</span>}
                </div>
                <div className={classcat(["form-group",
                   { "has-error": errors.email },
                     "col-lg-6",
                 ])}>
                  <label for="control-label" id="control-label">Email address</label>
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="email"
                    name="email" id="icon-prefix email" class="form-control"
                    id="control-label" aria-describedby="emailHelp" placeholder="Enter email"/>
                  {errors && <span className="help-block">{errors.email}</span>}
                </div>
              </div>
              <div className="row col-lg-12">
                <div className={classcat(["form-group",
                   { "has-error": errors.address },
                     "col-lg-6",
                 ])}>
                  <label for="control-label" id="control-label">Address</label>
                  <input
                    value={this.state.address}
                    onChange={this.onChange}
                    type="text"
                    name="address"
                    className="form-control"
                    id="control-label" placeholder="Address"/>
                  {errors && <span className="help-block">{errors.address}</span>}
                </div>
                <div className={classcat(["form-group",
                   { "has-error": errors.location },
                     "col-lg-6",
                 ])}>
                  <label for="control-label" id="control-label">Location</label>
                  <select className="custom-select"
                    type="select"
                    name="location"
                    onChange={this.onChange}
                    value={this.state.location}>
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
                 ])}>
                  <label for="control-label" id="control-label">Category</label>
                  <select className="custom-select"
                    type="select"
                    name="category"
                    onChange={this.onChange}
                    value={this.state.category}>
                    <option value="" disabled>choose category</option>
                    {categoryOptions}
                  </select>
                  {errors && <span className="help-block">{errors.category}</span>}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success" id="submit-button">
              {isLoading ? <span>processing <i class="fa fa-spinner fa-spin"></i></span> : <span>Submit</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  businessRegistrationRequest: PropTypes.func.isRequired,
  businessUpdateRequest: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  business: PropTypes.object.isRequired,
}

RegistrationForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default RegistrationForm;
