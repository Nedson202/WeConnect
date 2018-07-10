import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessList from '../common/BusinessList';
import filterBusiness from '../../actions/businessQueryAction';
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
    document.title = 'Search result';
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof SearchResultPage
   */
  render() {
    const { businesses, paginate } = this.props;
    const searchResult = businesses || [];
    const queryData = paginate ? paginate.queryData : {};

    const foundBusiness = (
      <div>
        { queryData !== undefined ? <h1 className="text-center textcase" id="business-found">Displaying business with {queryData.option}: {queryData.query}</h1> : null }
      </div>
    );

    return (
      <div>
        <div className="text-center business-profile" />
        {searchResult.length !== 0 ? foundBusiness : null}
        <BusinessList
          businesses={searchResult}
          filterBusiness={this.props.filterBusiness}
          paginate={paginate}
          queryData={queryData !== undefined ? queryData : {}}
        />
      </div>
    );
  }
}

SearchResultPage.propTypes = {
  filterBusiness: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { searchResult, paginationResult } = state.businesses;
  return {
    businesses: searchResult,
    paginate: paginationResult
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  filterBusiness
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultPage);
