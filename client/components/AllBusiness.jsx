import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BusinessList from './BusinessList';
import { fetchBusinesses } from '../actions/fetchBusinessAction';
import Spinner from './Spinner';

/**
 * @class AllBusiness
 *
 * @extends {Component}
 */
class AllBusiness extends Component {
  /**
   * @description Fetch reviews and business
   *
   * @returns {undefined}
   *
   * @memberof AllBusiness
   */
  componentWillMount() {
    document.title = 'Business list'

    this.props.fetchBusinesses();
  }
  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof BusinessProfile
   */
  render() {
    const { businesses, paginate, isLoading } = this.props;
    
    if(isLoading) {
      return <Spinner />
    }

    return (
      <div>
        <BusinessList
          businesses={businesses}
          paginate={paginate}
          fetchBusinesses={this.props.fetchBusinesses}
        />
      </div>
    );
  }
}

AllBusiness.propTypes = {
  fetchBusinesses: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    businesses: state.businesses,
    paginate: state.paginationResult,
    isLoading: state.loaderToggler.isLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinesses
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllBusiness);
