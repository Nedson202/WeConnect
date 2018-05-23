import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import businesses from './reducers/businesses';
import users from './reducers/users';
import reviews from './reducers/reviews';
import categories from './reducers/categories';
import locations from './reducers/locations';

export default combineReducers({
  flashMessages,
  auth,
  businesses,
  users,
  reviews,
  categories,
  locations
});
