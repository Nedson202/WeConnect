import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getName } from '../../utils/getUsername';
import avatar from '../../images/user-avatar.png';
import '../../index.css';

class ReviewList extends Component {

  render() {
    const { reviews, deleteReview, params } = this.props;
    const username = getName();

    return (
      <div>
        {reviews.map(review => <li  className="list-group-item" key={review._id}>
        <blockquote class="blockquote mb-0">
          <li><img src={avatar} className="rounded-circle user-avatar" alt="Avatar" width="30" height="30"/><span className="textcase reviewer">{review.reviewer} </span>
            {
              (username !== review.reviewer && username !== 'admin') ? null
              :  (username === review.reviewer || username === 'admin') ?
              <button onClick={() => deleteReview(params.id, review.id)} className="close" id='btn-close'><span>&times;</span></button> : null
            }
          </li>

          <p className="review-messgae">{review.message}</p>
          <p className="blockquote-footer textcase"><cite title="Source Title">{(review.createdAt).split('T')[0]} {(review.createdAt).split('T')[1].split('.')[0]}</cite></p>
          <a className="hide" id="showDeleteButton"  onClick={() => deleteReview(params.id, review.id)}><i className="fa fa-trash fa-lg"></i> delete</a>
        </blockquote>
      </li>)}
      </div>
    );
  }
}

export default ReviewList;
