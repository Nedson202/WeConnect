import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

/**
 * @class EditReview
 *
 * @extends {Component}
 */
const EditReview = ({
  onChange,
  onStarClick,
  state,
  onReviewUpdate,
  reviewId,
  cancelEdit
}) => {
  const { editMessage, editRating, isLoading } = state;
  return (
    <div className="row">
      <div className="col-lg-9">
        <button className="close" data-dismiss="modal" aria-label="Close" onClick={cancelEdit}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="form-group">
          <textarea
            value={editMessage}
            onChange={onChange}
            type="text"
            name="editMessage"
            className="form-control edit-review-textarea"
            id="control-label"
            placeholder="update review"
            rows="3"
          />
        </div>
        <ReactStars
          count={5}
          onChange={onStarClick}
          size={17}
          color1="#333333"
          color2="#ffaf00"
          value={editRating}
        />
      </div>
      <div className="col-lg-3">
        <button
          disabled={isLoading}
          className="btn btn-outline-success update-review-button"
          id="update-review"
          onClick={() => onReviewUpdate(reviewId)}
        >
          { !isLoading ? <span>Update review</span> : <span>Updating <i className="fa fa-spinner fa-spin" /></span>}
        </button>
      </div>
    </div>
  );
};

EditReview.propTypes = {
  onReviewUpdate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  reviewId: PropTypes.number.isRequired
};

export default EditReview;
