import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'rc-pagination/assets/index.css';
import ImageZoom from 'react-medium-image-zoom';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import ReviewModal from './ReviewModal';
import ReviewList from './ReviewList';
import { reviewRequest, reviewUpdateRequest } from '../../actions/postReviewAction';
import { deleteBusiness, deleteReview } from '../../actions/deleteAction';
import { fetchReviews, fetchBusinessById } from '../../actions/fetchActions';
import BusinessImageUpload from '../ImageUpload/BusinessImageUpload';
import green from '../../images/default.jpeg';
import { businessImageUploader, uploadToCloudinary } from '../../actions/imageUpload';
import Spinner from '../common/Spinner';
import loader from '../../actions/loader';

let reviewToDelete;
/**
 * @class BusinessProfile
 *
 * @extends {Component}
 */
export class BusinessProfile extends Component {
  /**
   * @description Creates an instance of BusinessProfile.
   * @param {object} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      editMessage: '',
      image: '',
      rating: 0,
      editRating: 0,
      errors: {},
      current: 1,
      editStatus: null,
      isLoading: false
    };

    this.onBusinessDelete = this.onBusinessDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onReviewPageChange = this.onReviewPageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.onReviewDelete = this.onReviewDelete.bind(this);
    this.deleteStatus = this.deleteStatus.bind(this);
    this.onReviewUpdate = this.onReviewUpdate.bind(this);
  }

  /**
   * @description Fetch reviews and business
   * @returns {undefined}
   * @memberof BusinessProfile
   */
  componentDidMount() {
    document.title = 'Business profile';
    const { id } = this.props.match.params;
    this.props.loader(true);
    this.props.fetchBusinessById(id);
    this.props.fetchReviews(id, 'page=1');
  }

  /**
   * @description Fetch reviews and business
   * @param{any} nextProps
   * @returns {undefined}
   * @memberof BusinessProfile
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.business) {
      const {
        name,
        email,
        address,
        location,
        category,
        description,
        image,
        averageRating
      } = nextProps.business;
      this.setState({
        name,
        email,
        address,
        location,
        category,
        image,
        description,
        averageRating,
      });
    }
  }
  /**
   * @description Handles image upload to firebase
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof ImageUpload
   */
  onImageChange(event) {
    const image = event.target.files[0];
    const uploadPreset = process.env.UPLOAD_PRESET;
    const cloudinaryApi = process.env.CLOUDINARY_API;
    this.props.uploadToCloudinary(
      image,
      uploadPreset,
      cloudinaryApi,
    )
      .then(() => {
        this.setState({ image: this.props.image });
      });
  }

  /**
   * @description Fetch reviews and business
   *
   * @param {any} event
   *
   * @param {any} rating
   *
   * @returns {undefined}
   *
   * @memberof BusinessProfile
   */
  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * @description Fetch reviews and business
   *
   * @param {any} newRating
   *
   * @returns {undefined}
   *
   * @memberof BusinessProfile
   */
  onStarClick(newRating) {
    if (!this.state.editStatus) {
      this.setState({ rating: newRating });
    }
    this.setState({ editRating: newRating });
  }

  /**
   * @description Fetch reviews and business
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof BusinessProfile
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { params } = this.props;
    const { message, rating } = this.state;

    if (!message || rating === 0) {
      this.setState({ isLoading: false });
      return toastr.error('Please leave a review and rating');
    }

    this.props.reviewRequest(params.id, this.state, this.props.fetchBusinessById).then(() => {
      this.setState({ message: '', rating: 0, isLoading: false });
    });
  }

  /**
   * @description Deletes business from the database
   *
   * @param {any} event
   * @param {any} username
   *
   * @returns {undefined}
   *
   * @memberof BusinessProfile
   */
  onBusinessDelete(event) {
    event.preventDefault();
    const { history, params } = this.props;
    const { username } = this.props.user;
    this.props.deleteBusiness(params.id, username, history);
  }
  /**
   * @description Delete business
   *
   * @param {any} businessId
   *
   * @param {any} reviewToDelete
   *
   * @returns {undefined}
   *
   * @memberof ReviewList
   */
  onReviewDelete(businessId) {
    return () => {
      this.props.deleteReview(businessId, reviewToDelete, this.props.fetchBusinessById);
    };
  }
  /**
   * @description Handles image url submission to database
   *
   * @param {any} event
   *
   * @returns {undefined}
   *
   * @memberof ImageUpload
   */
  onImageSubmit(event) {
    event.preventDefault();
    this.props.businessImageUploader(this.props.params.id, this.state);
  }
  /**
   * @description Toggler for pagination
   *
   * @param {any} page
   *
   * @returns {undefined}
   *
   * @memberof BusinessList
   */
  onReviewPageChange(page) {
    const genPage = `page=${page}`;
    const { params } = this.props;

    this.setState({
      current: page,
    });

    this.props.fetchReviews(params.id, genPage);
  }
  /**
   * @description Fetch reviews and business
   * @param {any} reviewId
   * @returns {undefined}
   * @memberof EditReview
   */
  onReviewUpdate(reviewId) {
    this.setState({ isLoading: true });
    const {
      params
    } = this.props;
    const { state, cancelEdit } = this;
    const { editMessage, editRating } = this.state;
    if (!editMessage || editRating === 0) {
    this.setState({ isLoading: false });
    return toastr.error('Please leave a review and rating');
    }
    this.props.reviewUpdateRequest(
      params.id,
      reviewId,
      state,
      this.props.fetchBusinessById
    )
      .then(
        () => {
          cancelEdit()
          this.setState({ isLoading: false });
        });
  }
  /**
   * @description Edit business
   * @returns {undefined}
   * @param {any} reviewId
   * @memberof ReviewList
   */
  cancelEdit() {
    this.setState({ editStatus: null });
  }
  /**
   * @description Edit business
   * @returns {undefined}
   * @param {any} id
   * @memberof ReviewList
   */
  deleteStatus(id) {
    reviewToDelete = id;
  }
  /**
   * @description Edit business
   * @returns {undefined}
   * @param {any} review
   * @memberof ReviewList
   */
  edit(review) {
    const { id, message, rating } = review;
    return () => {
      this.setState({
        editStatus: id,
        editMessage: message,
        editRating: rating
      });
    };
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
    const { image } = this.state;
    if (!this.props.business && image) {
      return image;
    }
    if (image) {
      return image;
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
      reviews, business, params, user, paginate, isLoading
    } = this.props;

    const {
      name,
      address,
      location,
      email,
      description,
      category,
      averageRating,
    } = this.state;

    const {
      state,
      onStarClick,
      onChange,
      onSubmit,
      edit,
      cancelEdit,
      deleteStatus,
      onReviewDelete,
      onReviewPageChange,
      onReviewUpdate,
      onImageChange,
      onImageSubmit
    } = this;

    if (isLoading) {
      return <Spinner isLoading={isLoading} />;
    }

    const noReviews = (
      <h3>No reviews yet</h3>
    );

    const noBusiness = (
      <h3 className="text-center" id="no-business-found">No business match found</h3>
    );

    const deleteButton = (
      <button className="btn btn-danger" data-toggle="modal" data-target="#businessDeleteModal">
        <i className="fa fa-trash fa-lg" /> delete
      </button>
    );

    if (business.name === undefined) {
      return noBusiness;
    }

    return (
      <div>
        <div className="business-profile container">
          <div className="row">
            <div className="row col-sm-12 col-lg-10 offset-lg-1 profile-icon-style">
              <div className="image-button-holder col-lg-4">
                <ImageZoom
                  image={{
                      src: `${this.imageGenerator()}`,
                      alt: 'business image',
                      className: 'img',
                      style: { width: '320px', height: '300px' }
                    }}
                  zoomImage={{
                      src: `${this.imageGenerator()}`,
                      alt: 'business image',
                    }}
                />

                { !user ? null :
                <span>
                  { user.userId === (business && business.userId) ?
                    <button
                      className="btn image-edit-button"
                      data-toggle="modal"
                      data-target="#businessImageModal"
                    >
                      <i className="fa fa-edit fa-lg" />
                    </button> : null }
                </span> }
                <BusinessImageUpload
                  params={params}
                  onImageSubmit={onImageSubmit}
                  onImageChange={onImageChange}
                  uploadToCloudinary={this.props.uploadToCloudinary}
                  state={state}
                />
              </div>
              <div className="col-lg-6 business-details">
                <h4 className="business-name text-capitalize">{ !business ? name : business.name}</h4>
                <h4>Description:</h4>
                <p>{ !business ? description : business.description }</p>
                <p><i className="fa fa-envelope" /><span>{ !business ? email : business.email }</span></p>
                <p><i className="fa fa-map-marker" /><span>{ !business ? `${address} ${location}` : `${business.address} ${business.location}` }</span></p>
                <p><i className="fa fa-tags" /><span>{ !business ? category : business.category }</span></p>
                <ReactStars
                  count={5}
                  size={17}
                  edit={false}
                  color1="#333333"
                  color2="#ffaf00"
                  value={!business ? averageRating : business.averageRating}
                />
                { user.userId === (business && business.userId) ?
                  <ul className="list-unstyled list-inline pull-right" style={{ paddingTop: '30px' }}>
                    <li className="list-inline-item">
                      <Link className="btn edit-button" id="permission-button" to={`/updatebusiness/${params.id}`}>
                        <i className="fa fa-edit fa-lg" /> edit
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      {deleteButton}
                    </li>
                  </ul> : null }
                { user.username === process.env.ADMIN ?
                  <ul
                    className="list-unstyled list-inline pull-right"
                    style={{ paddingTop: '30px', paddingBottom: '20px' }}
                  >
                    <li className="list-inline-item">
                      {deleteButton}
                    </li>
                  </ul> : null
                }
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-lg-10 offset-lg-1">
            <ReviewModal
              onStarClick={onStarClick}
              onChange={onChange}
              onSubmit={onSubmit}
              state={state}
              user={user}
              business={business}
              isPosting={isLoading}
            />
          </div>

          <div className="col-sm-12 col-lg-10 offset-lg-1">
            { reviews.length === 0 ? noReviews : (
              <ReviewList
                reviews={reviews}
                deleteReview={this.props.deleteReview}
                fetchBusinessById={this.props.fetchBusinessById}
                fetchReviews={this.props.fetchReviews}
                reviewUpdateRequest={this.props.reviewUpdateRequest}
                paginate={paginate}
                params={params}
                user={user}
                isLoading={isLoading}
                onStarClick={onStarClick}
                onChange={onChange}
                onSubmit={onSubmit}
                state={state}
                edit={edit}
                cancelEdit={cancelEdit}
                deleteStatus={deleteStatus}
                onReviewDelete={onReviewDelete}
                onReviewPageChange={onReviewPageChange}
                onReviewUpdate={onReviewUpdate}
              />
                )}
          </div>
        </div>

        <div className="modal fade" id="businessDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h4>Are you sure?</h4>
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
  reviewUpdateRequest: PropTypes.func.isRequired,
  // addFlashMessage: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  businessImageUploader: PropTypes.func.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  loader: PropTypes.func.isRequired,
  paginate: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  reviews: PropTypes.array,
  params: PropTypes.object.isRequired,
  business: PropTypes.object,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

BusinessProfile.contextTypes = {
  router: PropTypes.object.isRequired,
};

BusinessProfile.defaultProps = {
  reviews: [],
  business: {},
  paginate: {}
};

export const mapStateToProps = (state, props) => {
  const {
    businesses, isLoading, auth, image
  } = state;
  return {
    reviews: businesses.reviews,
    user: auth.user,
    business: businesses.business,
    params: props.match.params,
    paginate: businesses.paginationResult,
    image,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBusinessById,
  reviewRequest,
  reviewUpdateRequest,
  deleteBusiness,
  fetchReviews,
  deleteReview,
  businessImageUploader,
  loader,
  uploadToCloudinary,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
