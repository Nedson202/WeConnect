import React from 'react';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import ImageUploader from '../ImageUpload/ImageUpload.jsx'
import '../../index.scss';

const UserProfile = () => {
  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row col-lg-10 offset-lg-1">
          <div className="col-lg-2">
            <ImageUploader />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserProfile;
