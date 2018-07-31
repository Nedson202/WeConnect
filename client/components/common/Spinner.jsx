import React from 'react';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';

/**
 * @description react stateless component for card template
 *
 * @return {Object} spinner
 */
const Spinner = ({ isLoading }) => (
  <div className="spinner">
    <RingLoader
      color="#1a3c5d"
      loading={isLoading}
    />
  </div>
);

Spinner.propTypes = {
  isLoading: PropTypes.bool
};

Spinner.defaultProps = {
  isLoading: true
};

export default Spinner;
