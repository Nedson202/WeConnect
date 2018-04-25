import Auth from '../controller/Auth';
import validator from '../middlewares/validator';
import checkAuth from '../middlewares/check-auth';
import sorter from '../middlewares/business-filterer';

export default (route) => {
  route.post('/api/v1/auth/signup', validator.userSignup, Auth.createUser);
  route.post('/api/v1/auth/login', validator.userLogin, Auth.logUser);
  route.get('/api/v1/admin/users', checkAuth, Auth.getAllUser);
  route.delete('/api/v1/admin/users/:userId', checkAuth, validator.checkParams, sorter.checkUser, Auth.deleteUser);
};
