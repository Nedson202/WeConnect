import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

/**
 * @class ReviewModal
 *
 * @extends {Component}
 */
const ReviewModal = ({
  onChange, onStarClick, onSubmit, state, user, business
}) => {
  const { message, rating } = state;
  return (
    <div>
      { user.username === process.env.ADMIN ? null :
      <div>
        { business.userId === user.userId ? null :
        <div className="review-section row">
          <div className="col-lg-9">
            <div className="form-group">
              <label id="control-label">Add a review</label>
              <textarea
                value={message}
                onChange={onChange}
                type="text"
                name="message"
                className="form-control"
                id="control-label"
                placeholder="Add review"
                rows="3"
              />
            </div>
            <ReactStars
              count={5}
              onChange={onStarClick}
              size={19}
              color1="#333333"
              color2="#ffaf00"
              value={rating}
            />
          </div>
          <div className="col-lg-3 add-review">
            <button
              // disabled={isPosting}
              className="btn btn-outline-success add-review-button"
              id="add-review"
              onClick={onSubmit}
            >
              <span>Post review</span>
            </button>
          </div>
        </div>
        }
      </div>}
    </div>
  );
};

ReviewModal.propTypes = {
  state: PropTypes.object.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired
};

export default ReviewModal;
