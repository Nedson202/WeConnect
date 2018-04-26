import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classcat from 'classcat';
import Navbar from '../Navbar.jsx';
import ReviewModal from './ReviewModal.jsx';
import ReviewList from './ReviewList.jsx';
import FlashMessagesList from '../flash/FlashMessagesList';
import Footer from '../Footer.jsx';
import { fetchBusinessById } from '../../actions/fetchBusinessByIdAction';
import { reviewRequest } from '../../actions/postReviewAction';
import { addFlashMessage } from '../../actions/flashMessages';
import { deleteBusiness } from '../../actions/deleteBusinessAction';
import { fetchReviews } from '../../actions/fetchReviewAction';
import { deleteReview } from '../../actions/deleteReviewAction';
import '../../index.css';

class BusinessProfile extends Component {
  componentDidMount() {
    const showButtonToOwner = document.getElementById('owner');
    const showButtonToAdmin = document.getElementById('showButtonToAdmin');
    document.title = 'Business profile';
    this.props.fetchBusinessById(this.props.match.params.id).then(
      () => {
        if(this.props.user.userId === this.props.business.userId) {
          showButtonToOwner.classList.remove('hide');
        }

        if(this.props.user.username == 'admin') {
          showButtonToAdmin.classList.remove('hide');
        }
      }
    );
    this.props.fetchReviews(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.business.name,
      email: nextProps.business.email,
      address: nextProps.business.address,
      location: nextProps.business.location,
      category: nextProps.business.category,
    })
  }

  constructor(props){
    super(props);

    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.props.deleteBusiness(this.props.match.params.id).then(
      () => {
        if(this.props.user.username == 'admin') {
          this.context.router.history.push('/adminpanel');
        } else {          
          this.context.router.history.push('/dashboard');
        }
      }
    )
  }

  render() {
    const { reviewRequest, addFlashMessage, reviews, user, business, deleteReview } = this.props;
    const { params } = this.props.match;

    const noReviews = (
      <h3 className="hide">No reviews</h3>
    )

    const deleteButton = (
      <button className="dropdown-item" id="permission-button" onClick={this.onClick}><i className="fa fa-trash fa-lg"></i> delete profile</button>
    )

    return (
      <div>
        <Navbar />

        <div className="container">

          <div className="row profile-card">
            <div className="col-sm-12 col-lg-10 offset-lg-1">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center">Displaying profile for: { !business ? this.state.name : business.name}</h4>
                </div>

                <div className="card-body">
                  <ul className="list-group card-info">
                    <li  className="list-group-item">
                      <h4><span className="profile-details email-style">Email: </span>{ !business ? this.state.email : business.email}</h4>
                    </li>
                    <li  className="list-group-item">
                      <h4><span className="profile-details profile-address">Address: </span>{ !business ? this.state.address : business.address}</h4>
                    </li>
                    <li  className="list-group-item">
                      <h4><span className="profile-details profile-location">Location: </span>{ !business ? this.state.location : business.location}</h4>
                    </li>
                    <li  className="list-group-item">
                      <h4><span className="profile-details">Category: </span>{ !business ? this.state.category : business.category}</h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-10 offset-lg-1 text-center">
              <ul className="list-unstyled list-inline hide" id="owner">
                <li className="list-inline-item">
                  <Link className="dropdown-item" id="permission-button" to={`/registerbusiness/${params.id}`}><i className="fa fa-edit fa-lg"></i> edit profile</Link>
                </li>
                <li className="list-inline-item">
                  {deleteButton}
                </li>
              </ul>

              <ul className="list-unstyled list-inline hide" id="showButtonToAdmin">
                <li className="list-inline-item">
                  {deleteButton}
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-10 offset-lg-1">
              <FlashMessagesList />
              <ReviewModal reviewRequest={reviewRequest} addFlashMessage={addFlashMessage} params={params}/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-10 offset-lg-1">
            { reviews.length === 0 ? noReviews : <div className="card">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <ReviewList reviews={reviews} deleteReview={deleteReview}params={params}  />
                </ul>
              </div>
            </div> }
            </div>
          </div>

        </div>

        <Footer />
      </div>
    );
  }
}

BusinessProfile.propTypes = {
  reviewRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired
}

BusinessProfile.contextTypes= {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews,
    user: state.auth.user,
    business: state.businesses[0]
  }
}

export default connect(mapStateToProps,
  { fetchBusinessById, reviewRequest, addFlashMessage,
  deleteBusiness, fetchReviews, deleteReview } )(BusinessProfile);
