import React from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
/**
 * @class SearchForm
 *
 * @extends {Component}
 */
const SearchForm = ({
  onChange, onSubmit, state
}) => (
  <div>
    <form className="form-inline my-2 my-lg-2" onSubmit={onSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Filter businesses by"
        name="query"
        onChange={onChange}
        value={state.query}
      />
      <select
        className="custom-select"
        name="option"
        onChange={onChange}
        value={state.option}
      >
        <option value="">choose</option>
        <option value="name">Name</option>
        <option value="location">Location</option>
        <option value="category">Category</option>
      </select>
      <button className="btn btn-outline-success my-2 my-sm-0 search-button" type="submit" id="search-button">
        <i className="fa fa-search" />
      </button>
    </form>
  </div>
);

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default SearchForm;
