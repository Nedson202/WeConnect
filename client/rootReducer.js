import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import businesses from './reducers/businesses';
import categories from './reducers/categories';
import users from './reducers/users';
import reviews from './reducers/reviews';

export default combineReducers({
  flashMessages,
  auth,
  businesses,
  categories,
  users,
  reviews
});
