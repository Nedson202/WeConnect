import React from 'react';
import notFoundImage from '../../images/error.jpg';

const NotFound = () => (
  <div>
    <div className="text-center no-page-found">
      <img src={notFoundImage} alt="error" height="200px" width="200px" />
      <h1>The page you requested for was not found</h1>
    </div>
  </div>
);

export default NotFound;
