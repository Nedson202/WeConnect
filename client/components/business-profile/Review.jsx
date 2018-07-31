import 'rc-pagination/assets/index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageZoom from 'react-medium-image-zoom';
import ReactStars from 'react-stars';
import avatar from '../../images/user-avatar.png';
import EditReview from './EditReview';

/**
 * @class BusinessList
 * @extends {Component}
 */
class Review extends Component {
  /**
   * @description Display buttons
   * @returns {undefined}
   * @memberof ReviewList
   */
  displayButtons() {
    const {
      username,
      review,
      edit,
      deleteStatus,
    } = this.props;
    const { reviewer } = review;
    if (username === reviewer.username || username === process.env.ADMIN) {
      return (
        <div>
          <button
            className="close text-danger review-delete"
            data-toggle="modal"
            data-target="#confirmModal"
            onClick={() => deleteStatus(review.id)}
          >
            <i className="fa fa-trash" />
          </button>
          <button
            onClick={edit(review)}
            className="close"
          >
            <i className="fa fa-edit" />
          </button>
        </div>
      );
    }
    if (username !== reviewer.username && username !== process.env.ADMIN) {
      return null;
    }
    if (username === reviewer.username && username !== process.env.ADMIN) {
      return null;
    }
    if (username === reviewer.username || username === process.env.ADMIN) {
      return (
        <div>
          <button
            className="close text-danger"
            data-toggle="modal"
            data-target="#confirmModal"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      );
    }
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof ReviewList
   */
  render() {
    const {
      review,
      params,
      fetchReviews,
      reviewUpdateRequest,
      fetchBusinessById,
      cancelEdit,
      state,
      onReviewDelete,
      onChange,
      onStarClick,
      onReviewUpdate
    } = this.props;
    const {
      reviewer, message, rating, id, updatedAt
    } = review;

    const { image } = reviewer;

    if (state.editStatus === id) {
      return (
        <div>
          { !reviewer.image ? <img src={avatar} className="rounded-circle user-avatar" alt="Avatar" width="50" height="50" />
          : <img src={reviewer.image} className="rounded-circle user-avatar" alt="Avatar" width="50" height="50" />
        }
          <div className="review-body">
            <span className="textcase reviewer">{reviewer.username} </span>
            <EditReview
              reviewId={id}
              params={params}
              reviewUpdateRequest={reviewUpdateRequest}
              fetchReviews={fetchReviews}
              cancelEdit={cancelEdit}
              fetchBusinessById={fetchBusinessById}
              onChange={onChange}
              state={state}
              onStarClick={onStarClick}
              onReviewUpdate={onReviewUpdate}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        { !image ? <img src={avatar} className="rounded-circle user-avatar" alt="Avatar" width="50" height="50" />
          :
        <ImageZoom
          image={{
              src: `${image}`,
              alt: 'business image',
              className: 'img',
              style: {
 width: '50px', height: '50px', marginRight: '15px', float: 'left', borderRadius: '50%'
}
            }}
          zoomImage={{
              src: `${image}`,
              alt: 'business image',
            }}
        />
        }
        <div className="review-body">
          <span className="textcase reviewer">{reviewer.username} </span>
          {
            this.displayButtons()
          }
          <div id={id}>
            <p>{message}</p>
            <ReactStars
              count={5}
              edit={false}
              half
              size={17}
              color1="#333333"
              color2="#ffaf00"
              value={rating}
            />
          </div>
          <p
            className="mb-0 small font-weight-medium
            mb-1 text-muted lts-2px"
          >
            {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
          </p>
        </div>

        <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h4>Are you sure?</h4>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-success" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-outline-success" onClick={onReviewDelete(params.id, id)} data-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  fetchBusinessById: PropTypes.func.isRequired,
  reviewUpdateRequest: PropTypes.func.isRequired,
  onReviewDelete: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReviewUpdate: PropTypes.func.isRequired,
  deleteStatus: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  username: PropTypes.string
};

Review.defaultProps = {
  username: ''
};

export default Review;
