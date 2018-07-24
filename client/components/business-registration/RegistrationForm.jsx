import React from 'react';
import PropTypes from 'prop-types';
/**
 * @class RegistrationForm
 *
 * @extends {Component}
 */
const RegistrationForm = ({
  params,
  categories,
  locations,
  state,
  onChange,
  onSubmit,
  isLoading,
  changeValue, 
  defaultTotal, 
  color
}) => {
  // const { changeValue, defaultTotal, color } = state;

  // const categoryOption = categories.map(({ id, category }) =>
  //   <option key={id} value={category}>{category}</option>);

  // const locationOption = locations.map(({ id, location }) =>
  //   <option key={id} value={location}>{location}</option>);

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof RegistrationForm
   */
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="business-form-style">
          <h3 className="text-center form-header">
            { !params.id ? 'Register business' : 'Update business' }
          </h3>
          <div className="row">
            <div className="form-group col-lg-6">
              <label id="control-label">Business Name</label>
              <input
                value={state.name}
                onChange={onChange}
                type="text"
                name="name"
                className="form-control"
                id="control-label"
                placeholder="Business name"
              />
            </div>
            <div className="form-group col-lg-6">
              <label id="control-label">Email address</label>
              <input
                value={state.email}
                onChange={onChange}
                type="email"
                name="email"
                id="icon-prefix email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label id="control-label">Address</label>
              <input
                value={state.address}
                onChange={onChange}
                type="text"
                name="address"
                className="form-control"
                id="control-label"
                placeholder="Address"
              />
            </div>
            <div className="form-group col-lg-6">
              <label id="control-label">Location</label>
              <select
                className="form-control custom-select"
                type="select"
                name="location"
                onChange={onChange}
                value={state.location}
              >
                <option value="" disabled>choose location</option>
                {locations()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label id="control-label">Category</label>
              <select
                className="form-control custom-select"
                type="select"
                name="category"
                onChange={onChange}
                value={state.category}
              >
                <option value="" disabled>choose category</option>
                {categories ()}
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label id="control-label">Description</label>
              <textarea
                value={state.description}
                onChange={onChange}
                type="text"
                name="description"
                className="form-control"
                id="control-label"
                placeholder="Description"
                rows="3"
              />
              <p><span style={{ color }}>{changeValue}</span><span style={{ color: 'white' }}>/{defaultTotal}</span></p>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-success" id="submit-button">
            {isLoading ? <span className="processing-info">processing <i className="fa fa-spinner fa-spin" /></span> :
            <span><i className="fa fa-paper-plane" />&nbsp;
              { !params.id ? 'Submit' : 'Update' }
            </span>}
          </button>
        </div>
      </form>
    </div>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  categories: PropTypes.func.isRequired,
  locations: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeValue: PropTypes.number.isRequired,
  defaultTotal: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default RegistrationForm;
