import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BusinessList from '../common/BusinessList';
import { fetchBusinesses } from '../../actions/fetchActions';
import Spinner from '../common/Spinner';
import loader from '../../actions/loader';
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
    this.props.loader(true);
    document.title = 'Business list';
    this.props.fetchBusinesses('page=1');
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

    const allBusiness = businesses || [];

    if (isLoading) {
      return <Spinner isLoading={isLoading} />;
    }

    return (
      <div>
        { allBusiness.length === 0 ? null :
        <h2 style={{ paddingTop: '70px' }} className="text-center">Business Listings</h2>}
        <BusinessList
          businesses={allBusiness}
          paginate={paginate}
          fetchBusinesses={this.props.fetchBusinesses}
        />
      </div>
    );
  }
}

AllBusiness.propTypes = {
  fetchBusinesses: PropTypes.func.isRequired,
  loader: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  const { businesses, isLoading } = state;
  return {
    businesses: businesses.businesses,
    paginate: businesses.paginationResult,
    isLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinesses,
  loader
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllBusiness);
