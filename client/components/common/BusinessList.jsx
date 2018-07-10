import 'rc-pagination/assets/index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import BusinessCard from './BusinessCard';
import green from '../../images/default.jpeg';

/**
 * @class BusinessList
 *
 * @extends {Component}
 */
class BusinessList extends Component {
  /**
   * @description Creates an instance of BusinessList.
   *
   * @param {object} props
   *
   * @memberof Profile
   */
  constructor(props) {
    super(props);

    this.state = {
      current: 1
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * @description Toggler for pagination
   *
   * @param {any} page
   *
   * @returns {undefined}
   *
   * @memberof BusinessList
   */
  onChange(page) {
    const genPage = `page=${page}`;
    const {
      queryData, filterBusiness, fetchBusinesses, fetchBusinessesByUserId
    } = this.props;
    const { pathname } = window.location;

    this.setState({
      current: page,
    });

    if (pathname === '/searchresult') {
      filterBusiness(queryData.option, queryData.query, genPage);
    }

    if (pathname === '/dashboard') {
      fetchBusinessesByUserId(genPage);
    }

    if (pathname === '/businesses' || window.location.pathname === '/adminpanel') {
      fetchBusinesses(genPage);
    }
  }
  /**
   * @description Deletes business from the database
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof BusinessProfile
   */
  imageGenerator() {
    const { image } = this.state;
    if (!this.props.business && image) {
      return image;
    }
    if (image) {
      return image;
    }
    return green;
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof BusinessList
   */
  render() {
    const { businesses, paginate } = this.props;
    const { onChange, state } = this;
    const { pathname } = window.location;
    const { limit, totalBusinesses } = paginate;

    let noBusiness;

    if (pathname !== '/searchresult') {
      noBusiness = (
        <h2 className="text-center" id="no-business-found">No business registered yet</h2>
      );
    }

    if (pathname === '/searchresult') {
      noBusiness = (
        <h2 className="text-center" id="no-business-found">No Result Found</h2>
      );
    }

    const businessList = (
      <div className="row">
        { businesses.map(business => <BusinessCard business={business} key={business.id} />)}
      </div>
    );

    const paginateAll = (
      <div>{ businesses.length > 0 ?
        <div className="d-flex justify-content-center pagination">
          { paginate && totalBusinesses === undefined ? null :
          <Pagination
            onChange={onChange}
            current={state.current}
            total={!paginate ? null : totalBusinesses}
            defaultCurrent={state.current}
            defaultPageSize={!paginate ? null : limit}
          />
          }
        </div> : null}
      </div>
    );

    return (
      <div>
        <div className="container card-container">
          {businesses.length === 0 ? noBusiness : businessList}
        </div>

        <div>
          {
            !paginate ? null :
            <span>
              {totalBusinesses <= limit ? null : paginateAll}
            </span>
          }
        </div>
      </div>
    );
  }
}

BusinessList.propTypes = {
  filterBusiness: PropTypes.func,
  fetchBusinesses: PropTypes.func,
  fetchBusinessesByUserId: PropTypes.func,
  businesses: PropTypes.array.isRequired,
  business: PropTypes.object,
  paginate: PropTypes.object,
  queryData: PropTypes.object
};

BusinessList.defaultProps = {
  queryData: {},
  business: {},
  filterBusiness: null,
  fetchBusinessesByUserId: null,
  fetchBusinesses: null,
  paginate: {}
};

export default BusinessList;
