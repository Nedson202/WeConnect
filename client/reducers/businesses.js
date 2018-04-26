import {
  SET_BUSINESSES,
  SET_BUSINESSES_BY_ID,
  SET_BUSINESS_BY_ID,
  BUSINESS_DELETED,
 } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return action.businesses;

    case SET_BUSINESSES_BY_ID:
      return action.businesses;

    case SET_BUSINESS_BY_ID:
      return action.business;

    case BUSINESS_DELETED:
      return state.filter(business => business.id !== action.businessId);
    default: return state;
  }
};
