import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

class SearchForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: '',
      option: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  }

  onSubmit(e) {
    const { query, option } = this.state;
    e.preventDefault();
    this.props.filterBusiness(option, query).then(
      () => {
        sessionStorage.setItem('query', JSON.stringify(this.state));
        this.context.router.history.push('/searchresult');
      }
    )
  }

  render() {
    return (
      <div>
        <form class="form-inline my-2 my-lg-2" onSubmit={this.onSubmit}>
          <input class="form-control mr-sm-2" type="search" placeholder="Filter by location or category"
            name="query"
            onChange={this.onChange}
            value={this.state.query}
            required/>
            <select class="custom-select" name="option"
              onChange={this.onChange}
              value={this.state.option}
              required>
              <option value="">choose</option>
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="category">Category</option>
            </select>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  filterBusiness: PropTypes.func.isRequired
}

SearchForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SearchForm;
