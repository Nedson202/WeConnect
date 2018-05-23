import React, { Component } from 'react';
import BusinessList from '../BusinessList';
import '../../index.scss';

/**
 * @class SearcResultPage
 * 
 * @extends {Component}
 */
class SearchResultPage extends Component {
  /**
   * @description set page title
   * 
   * @returns {undefined}
   * 
   * @memberof SearchResultPage
   */
  componentDidMount() {
    document.title = 'Search result'
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof SearchResultPage
   */
  render() {
    const businessList = JSON.parse(sessionStorage.getItem('businessList'));
    const queryData = JSON.parse(sessionStorage.getItem('query'));

    const noBusiness = (
      <h1 className="text-center textcase" id="no-business-found">No business found with {queryData.option}: {queryData.query}</h1>
    )

    const foundBusiness = (
      <h1 className="text-center textcase" id="business-found">Displaying business with {queryData.option}: {queryData.query}</h1>
    )
    return (
      <div>
        <div className="text-center" />
        { !businessList ? null : foundBusiness}
        { !businessList ? noBusiness : (
          <BusinessList businesses={businessList} />
        )}
      </div>
    );
  }
}

export default SearchResultPage;
