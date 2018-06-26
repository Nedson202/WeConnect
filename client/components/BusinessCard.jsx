import React from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import green from '../images/default.jpeg';

/**
 * @description react stateless component for card template
 * 
 * @return {Object} action dispatched by the action creator
 */
const BusinessCard =({ business }) => {
  return (
    <div className="col col-sm-10 col-md-6 col-lg-4 card-style">
      <div className="card business-card">
        <div className="zoom"> 
          <Link to={`profile/${business.id}`}>
            <img className="card-img-top image-fluid" src={green} alt="business" height="200px" />
          </Link>
        </div>
        <div className="card-body">
          <p className="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
            {business.category}
          </p>
          <h5 className="card-title text-center">{business.name}</h5>
          <Truncate 
            line={2}
          >
            {business.description}            
          </Truncate>
          <div className="profile-icon-style">
            <p className="card-icon"><i className="fa fa-map-marker style" /><span>{ business.location }</span></p>          
          </div>
          <div>
            <Link to={`profile/${business.id}`}>Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;