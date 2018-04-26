import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BusinessCard({ business }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div class="card business-card">
        <div class="card-header text-center bg-transparent">
          <h5 className="card-title textcase">{business.name}
            <span>
              <Link to={`profile/${business.id}`} className="link">
                <i className="fa fa-angle-double-right float-right"></i>
              </Link>
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="card-style card-icon-style">
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
    </div>
  );
}

BusinessCard.propTypes = {
  business: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
}


// <img className="card-img-top" src={cardImage} alt="Card image cap"/>
