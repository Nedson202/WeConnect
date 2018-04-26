import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from './BusinessCard.jsx';

class BusinessList extends Component {
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

  componentDidMount() {
    const active = document.getElementById('current')
    const li = active.getElementsByClassName('list-inline-item')
    for (let i = 0; i < li.length; i++) {
      li[i].addEventListener("click", function() {
        const current = document.getElementsByClassName("active-page");
        current[0].className = current[0].className.replace(" active-page", "");
        this.className += " active-page";
      });
    }
  }

  calculatePageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.businesses.length / this.state.businessesPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  toggleList(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  toggleLess(event) {
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  toggleMore(event) {
    if(this.state.currentPage < this.calculatePageNumbers().length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  render() {
    const { businesses, deleteBusiness } = this.props;
    const { currentPage, businessesPerPage } = this.state;

    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    const currentBusinesses = businesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

    const noBusiness = (
      <h4 className="text-center">No business registered yet</h4>
    );

    const businessList = (
      <div className="row">
        { currentBusinesses.map(business => <BusinessCard business={business} key={business._id} deleteBusiness={deleteBusiness}/>)}
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
        <ul className="list-unstyled list-inline page-numbers text-center" id="current">
          <li className="list-inline-item active-page"
            onClick={this.toggleLess}><i className="fa fa-angle-left"></i></li>
          {renderPageNumbers}
          <li className="list-inline-item"
            onClick={this.toggleMore}><i className="fa fa-angle-right"></i></li>
        </ul>
      </div>
    );
  }
}

BusinessList.propTypes = {
  businesses: PropTypes.array.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
}

export default BusinessList;
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import cardImage from '../images/office.jpg';
// import BusinessCard from './BusinessCard.jsx';
//
// class BusinessList extends Component {
//   // componentDidMount() {
//   //   const hideDropItem = document.getElementById('dropleft');
//   //   hideDropItem.classList.add('hide')
//   //   document.title = 'Display business list'
//   // }
//
//   render() {
//     const { businesses, deleteBusiness } = this.props;
//
//     const noBusiness = (
//       <h4 className="text-center">No business registered yet</h4>
//     );
//
//     const businessList = (
//       <div className="row">
//         { businesses.map(business => <BusinessCard business={business} key={business._id} deleteBusiness={deleteBusiness}/>)}
//       </div>
//     );
//
//     return (
//       <div>
//         <div className="container card-container">
//           {businesses.length === 0 ? noBusiness : businessList}
//         </div>
//       </div>
//     );
//   }
// }
//
// BusinessList.propTypes = {
//   businesses: PropTypes.array.isRequired,
//   deleteBusiness: PropTypes.func.isRequired,
// }
//
// export default BusinessList;
