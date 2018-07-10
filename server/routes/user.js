import User from '../controller/User';
import validator from '../middlewares/validator';
import errorHandler from '../middlewares/error-handler';
import checkAuth from '../middlewares/check-auth';
import validateUser from '../middlewares/checkUserOwnerValidity';
import sorter from '../middlewares/business-filterer';
// all endpoints related to users
export default (route) => {
  route.post('/api/v1/Auth/signup', validator.userSignup, errorHandler, User.createUser);
  route.post('/api/v1/Auth/login', validator.userLogin, errorHandler, User.loginUser);
  route.get('/api/v1/admin/users', checkAuth, User.getAllUser);
  route.put('/api/v1/user/:userId', checkAuth, validateUser.checkUserValidity, validator.userUpdate, errorHandler, User.updateUser);
  route.delete('/api/v1/admin/users/:userId', checkAuth, validator.checkParams, sorter.checkUser, User.deleteUser);
};
