import React, { Component } from 'react';
import BusinessCard from './BusinessCard';

/**
 * @class BusinessProfile
 * 
 * @extends {Component}
 */
class BusinessList extends Component {
  /**
   * @description Creates an instance of BusinessProfile.
   * 
   * @param {object} props 
   * 
   * @memberof Profile
   */
  constructor(props){
    super(props);

    this.state = {
      currentPage: 1,
      businessesPerPage: 6
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleLess = this.toggleLess.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
  }

  /**
   * @description Fetch reviews and business
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  componentDidMount() {
    const active = document.getElementById('current');

    if(this.props.businesses.length > this.state.businessesPerPage) {
      const li = active.getElementsByClassName('list-inline-item')
      for (let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", function() {
          const current = document.getElementsByClassName("active-page");
          current[0].className = current[0].className.replace(" active-page", "");
          this.className += " active-page";
        });
      }
    }
  }

  /**
   * @description Fpage number calculator
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  calculatePageNumbers() {
    const pageNumbers = [];
    for (let counter = 1; counter <= Math.ceil(this.props.businesses.length / this.state.businessesPerPage); counter++) {
      pageNumbers.push(counter);
    }
    return pageNumbers;
  }

  /**
   * @description Toggler for pagination
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  toggleList(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  /**
   * @description Toggler for pagination
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  toggleLess() {
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  /**
   * @description Toggler for pagination
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  toggleMore() {
    if(this.state.currentPage < this.calculatePageNumbers().length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof BusinessProfile
   */
  render() {
    const { businesses } = this.props;
    const { currentPage, businessesPerPage } = this.state;

    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    const currentBusinesses = businesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

    const noBusiness = (
      <h2 className="text-center" id="no-business-found">No business registered yet</h2>
    );

    const businessList = (
      <div className="row">
        { currentBusinesses.map(business => <BusinessCard business={business} key={business.id} />)}
      </div>
    );

    const renderPageNumbers = this.calculatePageNumbers().map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.toggleList}
          className="list-inline-item"
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <div className="container card-container">
          {businesses.length === 0 ? noBusiness : businessList}
        </div>
        {businesses.length > businessesPerPage ? (
          <ul className="list-unstyled list-inline page-numbers text-center" id="current">
            <li
              className="list-inline-item active-page"
              onClick={this.toggleLess}
            ><i className="fa fa-angle-left" />
            </li>
            {renderPageNumbers}
            <li
              className="list-inline-item"
              onClick={this.toggleMore}
            ><i className="fa fa-angle-right" />
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default BusinessList;
