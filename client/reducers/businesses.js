import {
  ADD_BUSINESS,
  SET_BUSINESSES,
  SET_BUSINESSES_BY_ID,
  SET_BUSINESS_BY_ID,
  BUSINESS_DELETED,
  FILTERED_BUSINESSES,
  SET_LOCATIONS,
  SET_CATEGORIES,
  PAGINATION_RESULT,
  SET_REVIEWS,
  ADD_REVIEW,
  REVIEW_DELETED,
  EDIT_REVIEW,
} from '../actions/types';

const initialState = {
  businesses: [],
  businessOwnedByUser: [],
  business: {},
  searchResult: [],
  locations: [],
  categories: [],
  paginationResult: {},
  reviews: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUSINESS:
      return [
        ...state,
        action.business
      ];

    case SET_BUSINESSES:
      return {
        ...state,
        businesses: action.businesses
      };

    case SET_BUSINESSES_BY_ID:
      return {
        ...state,
        businessOwnedByUser: action.businesses
      };

    case SET_BUSINESS_BY_ID:
      return {
        ...state,
        business: action.business
      };

    case FILTERED_BUSINESSES:
      return {
        ...state,
        searchResult: action.searchResult
      };

    case BUSINESS_DELETED:
      return {
        ...state,
        businessOwnedByUser:
        state.businessOwnedByUser.filter(business => business.id !== action.businessId)
      };

    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };

    case PAGINATION_RESULT:
      return {
        ...state,
        paginationResult: action.result
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.review, ...state.reviews]
      };

    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };

    case REVIEW_DELETED:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.reviewId)
      };

    case EDIT_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) => {
          if (review.id === action.review.id) {
            review.message = action.review.message;
            review.rating = action.review.rating;
          }

          return review;
        })
      };

    default: return state;
  }
};
