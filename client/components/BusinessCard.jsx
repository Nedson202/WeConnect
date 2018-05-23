import React from 'react';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import green from '../images/default.jpeg';

/**
 * @description react stateless component for card template
 * 
 * @return {Object} action dispatched by the action creator
 */
const BusinessCard =({ business }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 card-style">
      <div className="card business-card blue-hover">
        <Link to={`profile/${business.id}`}>
          <img className="card-img-top image-fluid" src={green} alt="business" height="200px" />
        </Link>
        {/* <button className="btn   image-edit-button">edit</button> */}
        <div className="card-body">
          <p className="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
            {business.category}
          </p>
          <h5 className="card-title text-center">{business.name}</h5>
          <TextTruncate 
            line={2}
            text={business.description}
          />
          <div style={{"marginTop": "15px"}}>
            <Link to={`profile/${business.id}`}>Read more</Link>
            <span className="float-right"><i className="fa fa-eye" />{business.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;