import React from 'react';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';
import avatar from '../../images/user-avatar.png';
import '../../index.scss';

/**
 * @class ReviewList
 *
 * @extends {Component}
 */

const ReviewList = ({
 reviews, deleteReview, params, user 
}) => {
  const { username } = user;

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
                <button onClick={() => deleteReview(params.id, review.id)} className="close"><span>&times;</span></button> : null
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
    </div>
  );
};


export default ReviewList;
