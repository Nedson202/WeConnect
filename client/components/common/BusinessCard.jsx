import React from 'react';
import Truncate from 'react-truncate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import green from '../../images/default.jpeg';

/**
 * @description react stateless component for card template
 *
 * @return {Object} action dispatched by the action creator
 */
const BusinessCard = ({ business }) => {
  const {
    name, id, image, category, location, description
  } = business;
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 card-style">
      <div className="card business-card">
        <div className="card-header text-center textcase">
          <h5>{name}</h5>
        </div>
        <div className="zoom">
          <Link to={`profile/${id}`}>
            <img className="card-img-top image-fluid" src={image || green} alt="business" height="200px" />
          </Link>
        </div>
        <hr style={{ marginTop: 0, marginBottom: 0 }} />
        <div className="card-body">
          <p className="mb-0 small text-uppercase mb-1 lts-2px pull-left">
            {category}
          </p>
          <p className="mb-0 small text-uppercase mb-1 lts-2px pull-right">
            { location }
          </p>
          <div className="card-title text-center textcase"><p /></div>
          <Truncate
            line={2}
          >
            {description}
          </Truncate>
          <div>
            <Link to={`profile/${id}`}>
              <button className="btn btn-outline-success" id="read-more">Read more</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

BusinessCard.propTypes = {
  business: PropTypes.object.isRequired,
};

export default BusinessCard;
