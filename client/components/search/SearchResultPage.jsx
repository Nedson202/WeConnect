import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import BusinessList from '../BusinessList.jsx';
import Footer from '../Footer.jsx';
import '../../index.css';

class SearchResultPage extends Component {
  componentDidMount() {
    document.title = 'Search result'
  }

  render() {
    const businessList = JSON.parse(sessionStorage.getItem('businessList'));
    const queryData = JSON.parse(sessionStorage.getItem('query'));

    const noBusiness = (
      <h1 className="text-center textcase" id="no-business-found">No business found with {queryData.option}: {queryData.query}</h1>
    )
    return (
      <div>
        <Navbar />

        <div className="text-center">
        </div>
        { !businessList ? noBusiness : (
          <div className="container card-container">
            <h2 className="text-center textcase search-result-title">Displaying result for businesses with {queryData.option}: {queryData.query}</h2>
            <div className="row">
              {businessList.map(business => <div className="col-sm-12 col-md-6 col-lg-4" key={business.id}>
                  <div class="card business-card">
                    <div class="card-header text-center bg-transparent">
                      <h5 className="card-title textcase">{business.name}<span>
                        <Link to={`profile/${business.id}`} className="link"><i className="fa fa-angle-double-right float-right"></i>
                        </Link></span></h5>
                    </div>
                    <div className="card-body">
                      <div className="card-style">
                        <p><i class="fa fa-map-marker"></i><span className="card-info address">{business.address}</span></p>
                        <p><i class="fa fa-location-arrow"></i><span className="card-info location">{business.location}</span></p>
                        <p><i class="fa fa-envelope"></i><span className="card-info">{business.email}</span></p>
                      </div>
                    </div>
                    <div className="card-footer text-center bg-transparent">
                      <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                              <a className="btn-floating btn-sm btn-tw mx-1">
                                <span className="fa-stack fa-lg">
                                  <i className="fa fa-circle fa-stack-2x"></i>
                                  <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                          </li>
                          <li className="list-inline-item">
                              <a className="btn-floating btn-sm btn-li mx-1">
                                <span className="fa-stack fa-lg">
                                  <i className="fa fa-circle fa-stack-2x"></i>
                                  <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                          </li>
                          <li className="list-inline-item">
                              <a className="btn-floating btn-sm btn-li mx-1">
                                <span className="fa-stack fa-lg">
                                  <i className="fa fa-circle fa-stack-2x"></i>
                                  <i className="fa fa-linkedin fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                          </li>
                      </ul>
                    </div>
                  </div>
              </div>)}
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default SearchResultPage;

// <Link to={`profile/${business.id}`} ><img className="card-img-top" src={cardImage} alt="Card image cap"/></Link>

  // <h5 className="text-center card-title card-name">{business.name}</h5>
