import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import businesses from './reducers/businesses';
import paginationResult from './reducers/paginationResult';
import users from './reducers/users';
import reviews from './reducers/reviews';
import categories from './reducers/categories';
import locations from './reducers/locations';
import image from './reducers/image';
// import searchResult from './reducers/searchResult';
import loaderToggler from './reducers/loaderToggler';

export default combineReducers({
  flashMessages,
  auth,
  businesses,
  paginationResult,
  users,
  reviews,
  categories,
  locations,
  image,
  // searchResult,
  loaderToggler
});
