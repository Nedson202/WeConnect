import 'rc-pagination/assets/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import Review from './Review';
/**
 * @class BusinessList
 * @extends {Component}
 */
const ReviewsList = ({
  reviews,
  params,
  user,
  paginate,
  deleteReview,
  fetchBusinessById,
  reviewUpdateRequest,
  fetchReviews,
  onChange,
  onStarClick,
  state,
  edit,
  cancelEdit,
  deleteStatus,
  onReviewDelete,
  onReviewPageChange,
  onReviewUpdate,
}) => {
  const { username } = user;
  const { totalReviews, limit } = paginate;

  const paginateAll = (
    <div>{ reviews.length > 0 ?
      <div className="d-flex justify-content-center">
        { paginate && totalReviews === undefined ? null :
        <Pagination
          onChange={onReviewPageChange}
          current={state.current}
          total={!paginate ? null : totalReviews}
          defaultCurrent={state.current}
          defaultPageSize={!paginate ? null : limit}
        />
        }
      </div> : null}
    </div>
  );

  return (
    <div>
      {reviews.map(review =>
        (<Review
          review={review}
          key={review.id}
          params={params}
          username={username}
          deleteReview={deleteReview}
          fetchBusinessById={fetchBusinessById}
          fetchReviews={fetchReviews}
          onStarClick={onStarClick}
          onChange={onChange}
          state={state}
          reviewUpdateRequest={reviewUpdateRequest}
          edit={edit}
          cancelEdit={cancelEdit}
          deleteStatus={deleteStatus}
          onReviewDelete={onReviewDelete}
          onReviewUpdate={onReviewUpdate}
        />))
      }
      <div>
        {
          !paginate ? null :
          <span>
            {totalReviews <= limit ? null : paginateAll}
          </span>
        }
      </div>
    </div>
  );
};
ReviewsList.propTypes = {
  fetchReviews: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  fetchBusinessById: PropTypes.func.isRequired,
  reviewUpdateRequest: PropTypes.func.isRequired,
  onReviewUpdate: PropTypes.func.isRequired,
  onReviewPageChange: PropTypes.func.isRequired,
  paginate: PropTypes.object,
  state: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  onStarClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReviewDelete: PropTypes.func.isRequired,
  deleteStatus: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

ReviewsList.defaultProps = {
  paginate: {}
};

export default ReviewsList;
