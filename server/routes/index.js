import Auth from '../auth/user';
import Businesses from '../controller/business';
import Reviews from '../controller/review';
import userValidator from '../middlewares/user-validator';
import businessValidator from '../middlewares/business-validator';
import reviewValidator from '../middlewares/review-validator';
import businessFilter from '../middlewares/business-filterer';
import errorHandler from '../middlewares/error-handler';

export default (route) => {
  route.post('/api/v1/auth/signup', userValidator.userSignup, errorHandler, Auth.createUser);
  route.post('/api/v1/auth/login', userValidator.userLogin, errorHandler, Auth.logUser);
  route.post('/api/v1/businesses', businessValidator.registerBusiness, errorHandler, Businesses.createBusiness);
  route.get('/api/v1/businesses', businessFilter.filterByLocation, businessFilter.filterByCategory, Businesses.getBusiness);
  route.get('/api/v1/businesses/:businessId', Businesses.getOneBusiness);
  route.put('/api/v1/businesses/:businessId', Businesses.updateBusiness);
  route.delete('/api/v1/businesses/:businessId', businessFilter.filterBeforeDelete, Businesses.deleteBusiness);
  route.post('/api/v1/businesses/:businessId/reviews/', reviewValidator.reviews, errorHandler, Reviews.postReview);
  route.get('/api/v1/businesses/:businessId/reviews/', Reviews.getReview);
};
