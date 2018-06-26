import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'rc-pagination/assets/index.css';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import ReviewModal from './ReviewModal';
import ReviewList from '../ReviewList';
import fetchBusinessById from '../../actions/fetchBusinessByIdAction';
import reviewRequest from '../../actions/postReviewAction';
import addFlashMessage from '../../actions/flashMessages';
import deleteBusiness from '../../actions/deleteBusinessAction';
import fetchReviews from '../../actions/fetchReviewAction';
import deleteReview from '../../actions/deleteReviewAction';
import BusinessImageUpload from '../ImageUpload/BusinessImageUpload';
import '../../index.scss';
import green from '../../images/default.jpeg';
import businessImageUploader from '../../actions/businessImageUpload';
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
    this.props.fetchReviews(this.props.match.params.id, 'page=1');
  }

  /**
   * @description Fetch reviews and business
   * 
   * @param{any} nextProps
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.business) {
      const { business } = nextProps;
      this.setState({
        name: business.name,
        email: business.email,
        address: business.address,
        location: business.location,
        category: business.category,
        image: business.image,
        description: business.description,
        averageRating: business.averageRating,
      })
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

    this.props.deleteBusiness(this.props.match.params.id).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Business deleted successfully'
        });
        if (this.props.user.username == 'admin') {
          this.context.router.history.push('/adminpanel');
        } else {
          this.context.router.history.push('/dashboard');
        }
    });
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
  imageGenerator() {
    if(!this.props.business && this.state.image) {
      return this.state.image;
    }
    if(this.state.image) {
      return this.state.image;
    }
    return green;
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
      reviews, business, params, user, paginate
    } = this.props;

    const { 
      name, 
      address, 
      location, 
      email, 
      description, 
      category, 
      averageRating,  } = this.state;
      

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
        <div className="business-profile container">
          <div className="row">
            <div className="col-sm-12 col-lg-10 offset-lg-1 profile-icon-style">
              <div className="image-button-holder">
                <div className="zoom">
                  <img 
                    className="business-profile-image" 
                    id="business-image" 
                    src={this.imageGenerator()}
                    alt="Business" 
                  />
                </div>                
                <button 
                  className="btn image-edit-button hide" 
                  id="owner" 
                  data-toggle="modal" 
                  data-target="#businessImageModal"
                >
                  <i className="fa fa-edit fa-lg" />
                </button>
                <BusinessImageUpload 
                  params={params}
                  businessImageUploader={this.props.businessImageUploader}
                  addFlashMessage={this.props.addFlashMessage}
                />
              </div>
              <h4 className="text-center business-name text-capitalize">{ !business ? name : business.name}</h4>
              <div className="row">
                <div className="col-sm-12 col-lg-10 offset-lg-1 text-center">
                  <ul className="list-unstyled list-inline hide" id="owner">
                    <li className="list-inline-item">
                      <Link className="btn" id="permission-button" to={`/updatebusiness/${params.id}`}>
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
              <h4>Description:</h4>
              <p>{ !business ? description : business.description }</p>       
              <p><i className="fa fa-envelope" /><span>{ !business ? email : business.email }</span></p>          
              <p><i className="fa fa-map-marker" /><span>{ !business ? `${address} ${location}` : `${business.address} ${business.location}` }</span></p>          
              <p><i className="fa fa-map-marker" /><span>{ !business ? location : business.location }</span></p>          
              <p><i className="fa fa-tags" /><span>{ !business ? category : business.category }</span></p>          
              <StarRatingComponent
                name="rate2"             
                editing={false}
                starCount={5}
                value={!business ? averageRating : business.averageRating}
                starColor="#ffd700"
              />
            </div>

          </div>  

          <div className="col-sm-12 col-lg-10 offset-lg-1">
            <ReviewModal 
              reviewRequest={this.props.reviewRequest} 
              addFlashMessage={this.props.addFlashMessage} 
              params={this.props.params} 
              fetchReviews={this.props.fetchReviews}
              fetchBusinessById={this.props.fetchBusinessById}
            />
          </div>

          <div className="col-sm-12 col-lg-10 offset-lg-1">
            { reviews.length === 0 ? noReviews : (
              <ReviewList 
                reviews={reviews} 
                deleteReview={this.props.deleteReview} 
                fetchBusinessById={this.props.fetchBusinessById}
                fetchReviews={this.props.fetchReviews}
                paginate={paginate}
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
  businessImageUploader: PropTypes.func.isRequired,
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
    params,
    paginate: state.paginationResult,
    image: state.image,
    isLoading: state.loaderToggler.isLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinessById,
  reviewRequest,
  deleteBusiness,
  fetchReviews,
  deleteReview,
  addFlashMessage,
  businessImageUploader
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);