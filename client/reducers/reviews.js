import {
  SET_REVIEWS,
  ADD_REVIEW,
  REVIEW_DELETED
 } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [
        action.review,
        ...state
      ];

    case SET_REVIEWS:
      return action.reviews;

    case REVIEW_DELETED:
      return state.filter(review => review.id !== action.reviewId);

    default: return state;
  }
};
