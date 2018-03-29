import Reviews from '../controller/review';
import validator from '../middlewares/validator';
import errorHandler from '../middlewares/error-handler';
import checkAuth from '../middlewares/check-auth';

export default (route) => {
  route.post('/api/v1/businesses/:businessId/reviews/', checkAuth, validator.reviews, errorHandler, Reviews.postReview);
  route.get('/api/v1/businesses/:businessId/reviews/', Reviews.getReview);
};
