import Auth from '../controller/user';
import validator from '../middlewares/validator';
import errorHandler from '../middlewares/error-handler';

export default (route) => {
  route.post('/api/v1/auth/signup', validator.userSignup, errorHandler, Auth.createUser);
  route.post('/api/v1/auth/login', validator.userLogin, errorHandler, Auth.logUser);
};
