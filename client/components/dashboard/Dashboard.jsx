import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BusinessList from '../common/BusinessList';
import green from '../../images/default.jpeg';
import avatar from '../../images/user-avatar.png';
import UserProfileUpdate from '../user/UserProfileUpdate';
import { userProfileUpdateRequest } from '../../actions/userActions';
import { fetchBusinesses, fetchBusinessesByUserId } from '../../actions/fetchActions';
import { uploadToCloudinary } from '../../actions/imageUpload';
import Spinner from '../common/Spinner';
import loader from '../../actions/loader';

/**
 * @class Dashboard
 *
 * @extends {Component}
 */
export class Dashboard extends Component {
  /**
   * @description Creates an instance of Dashboard.
   *
   * @param {object} props
   *
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      isProfileHidden: false,
      username: user ? user.username : '',
      email: user ? user.email : '',
      image: '',
      backgroundImage: '',
      errors: {},
      uploading: false
    };

    this.handleProfileVisibility = this.handleProfileVisibility.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Set page title and fetch businesses owned by user
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
   */
  componentWillMount() {
    document.title = 'My dashboard';
    this.props.fetchBusinessesByUserId('page=1');
  }
  /**
   * @description handle submission of profile
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof UserProfileUpdate
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userProfileUpdateRequest(this.props.user.userId, this.state);
  }
  /**
   * @description Handles image upload to cloudinary
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof ImageUpload
   */
  onImageChange(event) {
    this.setState({ uploading: true });
    const image = event.target.files[0];
    const uploadPreset = process.env.UPLOAD_PRESET;
    const cloudinaryApi = process.env.CLOUDINARY_API;
    this.props.uploadToCloudinary(
      image,
      uploadPreset,
      cloudinaryApi,
    )
      .then(() => {
        this.setState({ image: this.props.image, uploading: false });
      });
  }
  /**
   * @description update state with data from input
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof UserProfileUpdate
   */
  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * @description handle toggler for permission
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
   */
  handleProfileVisibility() {
    this.setState(prevState => ({
      isProfileHidden: !prevState.isProfileHidden,
    }));
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof Dashboard
   */
  render() {
    const {
      user, paginate, businesses, image, isLoading
    } = this.props;
    const imageUrl = localStorage.getItem('image');

    if (isLoading) {
      return <Spinner isLoading={isLoading} />;
    }

    const myBusiness = businesses || [];
    const { isProfileHidden } = this.state;
    const {
      state, onChange, onSubmit, onImageChange
    } = this;

    return (
      <div>
        <div className="dashboard-heading">
          <h3>Welcome { !user ? null : user.username}!</h3>

          <button className="btn btn-outline-success" id="permission-button">
            <Link to="/registerbusiness" className="link">
              Register a business
            </Link>
          </button>
        </div>

        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.handleProfileVisibility}>
          {isProfileHidden ? 'Hide profile' : 'Show profile'}
        </button>

        {isProfileHidden && (
          <div className="card profile-card">
            <img className="card-img-top image-fluid" src={green} alt="business" height="150px" />
            { !imageUrl ?
              <img className="rounded-circle image-fluid user-card-image" src={avatar} alt="business" id="profile-image" />
              : <img className="rounded-circle image-fluid user-card-image" src={image ? imageUrl : image} alt="business" />
            }
            <div className="card-body text-center">
              <h5 className="card-title">{user.username}
                <i className="fa fa-edit float-right" data-toggle="modal" data-target="#updateModal" />
              </h5>
              <p className="card-text ">{user.email}</p>
            </div>
          </div>
        )}

        <UserProfileUpdate
          user={user}
          userProfileUpdateRequest={this.props.userProfileUpdateRequest}
          uploadToCloudinary={this.props.uploadToCloudinary}
          state={state}
          onChange={onChange}
          onSubmit={onSubmit}
          onImageChange={onImageChange}
        />

        { isLoading ? <Spinner /> : <BusinessList
          businesses={myBusiness}
          paginate={paginate}
          fetchBusinesses={this.props.fetchBusinesses}
          user={user}
          fetchBusinessesByUserId={this.props.fetchBusinessesByUserId}
        /> }

      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchBusinesses: PropTypes.func.isRequired,
  fetchBusinessesByUserId: PropTypes.func.isRequired,
  userProfileUpdateRequest: PropTypes.func.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  businesses: PropTypes.array,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired,
  paginate: PropTypes.object
};

Dashboard.defaultProps = {
  paginate: {},
  businesses: []
};

const mapStateToProps = (state) => {
  const {
    businesses, isLoading, auth, image
  } = state;
  return {
    businesses: businesses.businessOwnedByUser,
    user: auth.user,
    paginate: businesses.paginationResult,
    image,
    isLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinesses,
  fetchBusinessesByUserId,
  userProfileUpdateRequest,
  uploadToCloudinary,
  loader
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
