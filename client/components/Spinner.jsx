import React from 'react';

/**
 * @description react stateless component for card template
 * 
 * @return {Object} action dispatched by the action creator
 */
const Spinner = () => {
  return (
    <div className="spinner">
      <i className="fa fa-circle-o-notch fa-spin" />
    </div>
  );
}

export default Spinner;