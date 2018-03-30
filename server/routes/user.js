import Auth from '../controller/Auth';
import validator from '../middlewares/validator';
import errorHandler from '../middlewares/error-handler';
import checkAuth from '../middlewares/check-auth';
import sorter from '../middlewares/business-filterer';

export default (route) => {
  route.post('/api/v1/auth/signup', validator.userSignup, errorHandler, Auth.createUser);
  route.post('/api/v1/auth/login', validator.userLogin, errorHandler, Auth.logUser);
  route.get('/api/v1/admin/users', checkAuth, errorHandler, Auth.getAllUser);
  route.delete('/api/v1/admin/users/:userId', checkAuth, validator.checkParams, errorHandler, sorter.checkUser, Auth.deleteUser);
};
