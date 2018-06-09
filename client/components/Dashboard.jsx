import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BusinessList from './BusinessList';
import '../index.scss';
import green from '../images/default.jpeg';
import avatar from '../images/user-avatar.png';
import UserProfileUpdate from './UserProfileUpdate';
import userProfileUpdateRequest from '../actions/userProfileUpdateAction';
import {fetchBusinesses, fetchBusinessesByUserId } from '../actions/fetchBusinessAction';
import addFlashMessages from '../actions/flashMessages';
import imageUploader from '../actions/imageUpload';

/**
 * @class Dashboard
 *
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * @description Creates an instance of Dashboard.
   *
   * @param {object} props
   *
   * @memberof Dashboard
   */
  constructor(props){
    super(props);

    this.state = {
      isProfileHidden: false,
    };

    this.handleProfileVisibility = this.handleProfileVisibility.bind(this);
  }

  /**
   * @description Set page title and fetch businesses owned by user
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
   */
  componentWillMount() {
    document.title = 'My dashboard'

    // this.props.fetchBusinesses().then(
    //   () => {
    //     const businesses = this.props.businesses.filter(business => business.userId === this.props.user.userId);
    //     this.setState({ businesses })
    //     console.log(this.state.businesses);
    //   }
    // );
    this.props.fetchBusinessesByUserId('page=1');
  }

  /**
   * @description handle toggler for permission
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
   */
  handleProfileVisibility() {
    this.setState((prevState) => {
      return {
        isProfileHidden: !prevState.isProfileHidden,
      }
    })
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof Dashboard
   */
  render() {
    const { user, paginate, businesses, image } = this.props;
    const imageUrl = localStorage.getItem('image');

    return (
      <div>
        <div className="dashboard-heading">
          <h3>Welcome { !user ? null : user.username}!</h3>

          <button className="btn btn-outline-success permission-button" id="permission-button">
            <Link to="/registerbusiness" className="link">
              Register a business
            </Link>
          </button>
        </div>

        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.handleProfileVisibility}>
          {this.state.isProfileHidden ? 'Hide profile' : 'Show profile'}
        </button>

        {this.state.isProfileHidden && (
          <div className="card profile-card">
            <img className="card-img-top image-fluid" src={green} alt="business" height="150px" />
            { !imageUrl ?
              <img className="rounded-circle image-fluid user-card-image" src={avatar} alt="business" id="profile-image" />
              :  <img className="rounded-circle image-fluid user-card-image" src={image ? imageUrl : image} alt="business" />
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
          addFlashMessages={this.props.addFlashMessages}
          imageUploader={this.props.imageUploader}
        />

        <BusinessList
          businesses={businesses}
          paginate={paginate}
          fetchBusinesses={this.props.fetchBusinesses}
          user={user}
          fetchBusinessesByUserId={this.props.fetchBusinessesByUserId}
        />

      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchBusinesses: PropTypes.func.isRequired,
  fetchBusinessesByUserId: PropTypes.func.isRequired,
  userProfileUpdateRequest: PropTypes.func.isRequired,
  addFlashMessages: PropTypes.func.isRequired,
  imageUploader: PropTypes.func.isRequired,
}

const mapStateToProps =(state) => {
  return {
    businesses: state.businesses,
    user: state.auth.user,
    paginate: state.paginationResult,
    image: state.image
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinesses,
  fetchBusinessesByUserId,
  userProfileUpdateRequest,
  addFlashMessages,
  imageUploader,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
