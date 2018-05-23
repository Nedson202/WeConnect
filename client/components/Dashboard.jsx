import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlashMessagesList from './flash/FlashMessagesList';
// import { getName } from '../utils/getUsername';
import BusinessList from './BusinessList';
import '../index.scss';
import green from '../images/default.jpeg';
import avatar from '../images/user-avatar.png';
import UserProfileUpdate from './UserProfileUpdate';
import userProfileUpdateRequest from '../actions/userProfileUpdateAction';
import { fetchBusinessesByUserId } from '../actions/fetchBusinessAction';

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
      isProfileHidden: false
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
  componentDidMount() {
    document.title = 'My dashboard'
    this.props.fetchBusinessesByUserId();
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
    const { businesses, user } = this.props;
    const imageUrl = localStorage.getItem('image');

    return (
      <div>
        <FlashMessagesList />
        <div className="dashboard-heading">
          <h3>Welcome { !this.props.user ? null : this.props.user.username}!</h3>

          <Link to="/registerbusiness" className="link">
            <button className="btn btn-outline-success permission-button" id="permission-button">
              Register a business
            </button>
          </Link>
        </div>

        <button className="btn btn-outline-success permission-button" type="submit" id="permission-button" onClick={this.handleProfileVisibility}>
          {this.state.isProfileHidden ? 'Hide profile' : 'Show profile'}
        </button>

        {this.state.isProfileHidden && (
          <div className="card profile-card blue-hover">
            <img className="card-img-top image-fluid" src={green} alt="business" height="150px" />
            { !imageUrl ?
              <img className="rounded-circle image-fluid user-card-image" src={avatar} alt="business" />
              :  <img className="rounded-circle image-fluid user-card-image" src={imageUrl} alt="business" /> 
            }
            {/* <img className="rounded-circle image-fluid user-card-image" src={imageUrl} alt="business" /> */}
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
        />

        <BusinessList businesses={businesses} />

      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchBusinessesByUserId: PropTypes.func.isRequired,
  userProfileUpdateRequest: PropTypes.func.isRequired,
}

const mapStateToProps =(state) => {
  return {
    businesses: state.businesses,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinessesByUserId,
  userProfileUpdateRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);