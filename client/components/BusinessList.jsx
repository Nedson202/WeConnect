import 'rc-pagination/assets/index.css';
import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import BusinessCard from './BusinessCard';

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
  constructor(props){
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
    const genPage = `page=${page}`
    
    this.setState({
      current: page,
    });

    if(location.pathname == '/dashboard') {
      this.props.fetchBusinessesByUserId(genPage);      
    }

    if(location.pathname == '/businesses') {
      this.props.fetchBusinesses(genPage);
    }
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

    let noBusiness;
    
    if(location.pathname !== '/searchresult') {
      noBusiness = (
        <h2 className="text-center" id="no-business-found">No business registered yet</h2>
      );
    }


    if(location.pathname === '/searchresult') {
      noBusiness = (
        <h2 className="text-center" id="no-business-found">No search request</h2>
      );
    }

    const businessList = (
      <div className="row">
        { businesses.map(business => <BusinessCard business={business} key={business.id} />)}
      </div>
    );

    const paginateAll = (
      <div>{ businesses.length > 0 ?
        <div className="d-flex justify-content-center">
          { paginate && paginate.limit === undefined ? null : 
          <Pagination 
            onChange={this.onChange} 
            current={this.state.current} 
            total={!paginate ? null : paginate.totalBusinesses} 
            defaultCurrent={this.state.current}
            defaultPageSize={!paginate ?  null : paginate.limit}
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

        { !paginate ? null
          : paginate.totalBusinesses <= paginate.limit ? null :  paginateAll}
      </div>
    );
  }
}

export default BusinessList;
