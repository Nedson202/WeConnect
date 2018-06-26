import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { businesses } = this.props;
    const queryData = JSON.parse(sessionStorage.getItem('query'));

    const foundBusiness = (
      <h1 className="text-center textcase" id="business-found">Displaying business with {queryData.option}: {queryData.query}</h1>
    )

    return (
      <div>
        <div className="text-center business-profile" />
        {businesses.length !== 0 ? foundBusiness : null}
        <BusinessList businesses={businesses} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    businesses: state.businesses       
    // businesses: state.searchResult       
  }
}

export default connect(mapStateToProps)(SearchResultPage);
