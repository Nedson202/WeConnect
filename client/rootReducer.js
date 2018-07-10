import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import businesses from './reducers/businesses';
import users from './reducers/users';
import image from './reducers/image';
import isLoading from './reducers/loaderToggler';

export default combineReducers({
  flashMessages,
  auth,
  businesses,
  users,
  image,
  isLoading
});
