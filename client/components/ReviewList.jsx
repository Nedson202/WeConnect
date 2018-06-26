import 'rc-pagination/assets/index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Pagination from 'rc-pagination';
import StarRatingComponent from 'react-star-rating-component';
import avatar from '../images/user-avatar.png';
import ReviewList from './business-profile/ReviewList';

/**
 * @class BusinessList
 * @extends {Component}
 */
class ReviewsList extends Component {
  /**
   * @description Creates an instance of BusinessList.
   * @param {object} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);

    this.state = {
      current: 1
    };

    this.onChange = this.onChange.bind(this);
    this.onReviewDelete = this.onReviewDelete.bind(this);
  }

  /**
   * @description Fetch reviews and business
   * 
   * @returns {undefined}
   * 
   * @memberof BusinessProfile
   */

  /**
   * @description Toggler for pagination
   *
   * @param {any} page
   *
   * @returns {undefined}
   *
   * @memberof BusinessList
   */
  onChange(page) {
    const genPage = `page=${page}`;

    this.setState({
      current: page,
    });

    this.props.fetchReviews(this.props.params.id, genPage);
  }

  /**
   * @description Delere business
   *
   * @param {any} businessId
   *
   * @param {any} reviewId
   *
   * @returns {undefined}
   *
   * @memberof ReviewList
   */
  onReviewDelete(businessId, reviewId) {
    return () => {
      this.props.deleteReview(businessId, reviewId).then(() => {
        this.props.fetchBusinessById(businessId);
      });
    };
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
      reviews, params, user, paginate
    } = this.props;
    const { username } = user;

    const paginateAll = (
      <div>{ reviews.length > 0 ?
        <div className="d-flex justify-content-center">
          { paginate.limit === undefined ? null :
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            total={!paginate ? null : paginate.totalReviews}
            defaultCurrent={this.state.current}
            defaultPageSize={!paginate ? null : paginate.limit}
          />
          }
        </div> : null}
      </div>
    );

    // console.log(paginate);


    return (
      <div>
        {reviews.map(review => (
          <div key={review.id}>
            { !review.reviewer.image ? <img src={avatar} className="rounded-circle user-avatar" alt="Avatar" width="50" height="50" />
            : <img src={review.reviewer.image} className="rounded-circle user-avatar" alt="Avatar" width="50" height="50" />
          }
            <div className="review-body">
              <span className="textcase reviewer">{review.reviewer.username} </span>
              {
              (username !== review.reviewer.username && username !== 'admin') ? null
              : (username === review.reviewer.username || username === 'admin') ?
                <button onClick={this.onReviewDelete(params.id, review.id)} className="close"><span>&times;</span></button> : null
            }
              <p>{review.message}</p>
              <StarRatingComponent
                name="rate2"
                editing={false}
                starCount={5}
                value={review.rating}
                starColor="#ffd700"
              />
              <p
                className="mb-0 small font-weight-medium
              mb-1 text-muted lts-2px"
              >
                {moment(review.createdAt).format('Do MMMM YYYY HH:mm')}
              </p>
            </div>
          </div>))}

        { !paginate ? null
          : paginate.totalReviews <= paginate.limit ? null : paginateAll}
      </div>
    );
  }
}

ReviewList.propTypes = {
  fetchReviews: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

export default ReviewsList;
