import Auth from '../auth/user';
import Businesses from '../controller/business';
import Reviews from '../controller/review';
import userValidator from '../middlewares/user-validator';
import validateBusiness from '../middlewares/business-validator';
import users from '../model/user';


export default (route) => {
  route.post('/api/v1/auth/signup', userValidator.userSignup, Auth.createUser);
};
