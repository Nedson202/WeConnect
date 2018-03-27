import Reviews from '../controller/review';
import validator from '../middlewares/validator';
import errorHandler from '../middlewares/error-handler';

export default (route) => {
  route.post('/api/v1/businesses/:businessId/reviews/', validator.reviews, errorHandler, Reviews.postReview);
  route.get('/api/v1/businesses/:businessId/reviews/', Reviews.getReview);
};
