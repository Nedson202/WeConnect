import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReviewModal from './ReviewModal';
import ReviewList from './ReviewList';
import FlashMessagesList from '../flash/FlashMessagesList';
import fetchBusinessById from '../../actions/fetchBusinessByIdAction';
import reviewRequest from '../../actions/postReviewAction';
import { addFlashMessage } from '../../actions/flashMessages';
import deleteBusiness from '../../actions/deleteBusinessAction';
import fetchReviews from '../../actions/fetchReviewAction';
import deleteReview from '../../actions/deleteReviewAction';
import BusinessImageUpload from '../BusinessImageUpload';
import '../../index.scss';
import green from '../../images/default.jpeg';

/**
 * @class BusinessProfile
 * 
 * @extends {Component}
 */
class BusinessProfile extends Component {
  /**
   * @description Creates an instance of BusinessProfile.
   * 
   * @param {object} props 
   * 
   * @memberof Profile
   */
  constructor(props) {
    super(props);

    this.state = {};
    this.onBusinessDelete = this.onBusinessDelete.bind(this);
  }

  /**
   * @description Fetch reviews and business
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  componentDidMount() {
    const showButtonToOwner = document.querySelectorAll('#owner');
    const showButtonToAdmin = document.getElementById('showButtonToAdmin');
    document.title = 'Business profile';
    this.props.fetchBusinessById(this.props.match.params.id).then(() => {
      if (this.props.user.userId === this.props.business.userId) {
        showButtonToOwner.forEach((button) => {
          button.classList.remove('hide');
        })
      }

      if (this.props.user.username == 'admin') {
        showButtonToAdmin.classList.remove('hide');
      }
    });
    this.props.fetchReviews(this.props.match.params.id);
  }

  /**
   * @description Retrieve business fetched
   * 
   * @param {any} nextProps
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.business) {
      this.setState({
        name: nextProps.business.name,
        email: nextProps.business.email,
        address: nextProps.business.address,
        location: nextProps.business.location,
        category: nextProps.business.category,
        description: nextProps.business.description,
        image: nextProps.business.image,
      });
    }
  }

  /**
   * @description Deletes business from the database
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  onBusinessDelete(event) {
    event.preventDefault();

    this.props.deleteBusiness(this.props.match.params.id).then(() => {
      if (this.props.user.username == 'admin') {
        this.context.router.history.push('/adminpanel');
      } else {
        this.context.router.history.push('/dashboard');
      }
    });
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof BusinessProfile
   */
  render() {
    const {
      reviews, business, params, user 
    } = this.props;

    const { name, address, location, email, description, category, image } = this.state;

    const noReviews = (
      <h3>No reviews yet</h3>
    );

    const deleteButton = (
      <button className="btn btn-danger" data-toggle="modal" data-target="#confirmModal">
        <i className="fa fa-trash fa-lg" /> delete
      </button>
    );
    
    return (
      <div>
        <div className="container">

          <div className="row">
            <div className="col-sm-12 col-lg-10 offset-lg-1 profile-icon-style">
              {/* <img className="business-profile-image" src={green} alt="" /> */}
              <div className="image-button-holder">
                <img className="business-profile-image" id="business-image" src={!image ? green : image} alt="" />
                <button 
                  className="btn image-edit-button hide" 
                  id="owner" 
                  data-toggle="modal" 
                  data-target="#businessImageModal"
                >
                  <i className="fa fa-edit fa-lg" />
                </button>
                <BusinessImageUpload params={params} />
              </div>
              <h4 className="text-center business-name text-capitalize">{ !business ? name : business.name}</h4>
              <div className="row">
                <div className="col-sm-12 col-lg-10 offset-lg-1 text-center">
                  <ul className="list-unstyled list-inline hide" id="owner">
                    <li className="list-inline-item">
                      <Link className="btn" id="permission-button" to={`/registerbusiness/${params.id}`}>
                        <i className="fa fa-edit fa-lg" /> edit
                      </Link>
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
              <p className="mb-0 small font-weight-medium business-category
                text-uppercase mb-1 text-muted lts-2px"
              >
                { !business ? category : business.category }
              </p>
              <h4>Description:</h4>
              <p>{ !business ? description : business.description }</p>       
              <p><i className="fa fa-envelope" /><span>{ !business ? email : business.email }</span></p>          
              <p><i className="fa fa-map-marker" /><span>{ !business ? `${address} ${location}` : `${business.address} ${business.location}` }</span></p>          
            </div>

          </div>

          <div className="col-sm-12 col-lg-10 offset-lg-1">
            <FlashMessagesList />
            <ReviewModal 
              reviewRequest={this.props.reviewRequest} 
              addFlashMessage={this.props.addFlashMessage} 
              params={this.props.params} 
            />
          </div>

          <div className="col-sm-12 col-lg-10 offset-lg-1">
            { reviews.length === 0 ? noReviews : (
              <ReviewList 
                reviews={reviews} 
                deleteReview={this.props.deleteReview} 
                params={params} 
                user={user}
              />
                )}
          </div>

        </div>

        <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h4>Delete business profile?</h4>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-success" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-outline-success" onClick={this.onBusinessDelete} data-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BusinessProfile.propTypes = {
  fetchBusinessById: PropTypes.func.isRequired,
  reviewRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
};

BusinessProfile.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
  const { params } = props.match;
  return {
    reviews: state.reviews,
    user: state.auth.user,
    business: state.businesses[0],
    params
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinessById,
  reviewRequest,
  deleteBusiness,
  fetchReviews,
  deleteReview,
  addFlashMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);