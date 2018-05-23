import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';

/**
 * @class SearchForm
 * 
 * @extends {Component}
 */
class SearchForm extends Component {
  /**
   * @description Creates an instance of search from.
   * 
   * @param {object} props 
   * 
   * @memberof Navbar
   */
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      option: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Handles input change
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof SearchForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value.toLowerCase() });
  }

  /**
   * @description Handles input submission
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof SearchForm
   */
  onSubmit(event) {
    const { query, option } = this.state;
    event.preventDefault();
    this.props.filterBusiness(option, query).then(() => {
      sessionStorage.setItem('query', JSON.stringify(this.state));
      this.context.router.history.push('/searchresult');
    });
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof BusinessProfile
   */
  render() {
    return (
      <div>
        <form className="form-inline my-2 my-lg-2" onSubmit={this.onSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Filter by location or category"
            name="query"
            onChange={this.onChange}
            value={this.state.query}
            required 
          />
          <select
            className="custom-select"
            name="option"
            onChange={this.onChange}
            value={this.state.option}
            required
          >
            <option value="">choose</option>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="category">Category</option>
          </select>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-search" /></button>
        </form>
      </div>
    );
  }
}

SearchForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchForm;
