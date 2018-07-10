import Reviews from '../controller/review';
import validator from '../middlewares/validator';
import reviewerValidator from '../middlewares/reviewerValidator';
import errorHandler from '../middlewares/error-handler';
import sorter from '../middlewares/find-review';
import checkAuth from '../middlewares/check-auth';
// all endpoints related to reviews
export default (route) => {
  route.post('/api/v1/businesses/:businessId/reviews/', checkAuth, reviewerValidator.checkReviewer, validator.reviews, errorHandler, Reviews.postReview);
  route.get('/api/v1/businesses/:businessId/reviews/', Reviews.getReview);
  route.put('/api/v1/businesses/:businessId/reviews/:reviewId', checkAuth, sorter.findBusinessAndReview, Reviews.updateReview);
  route.delete('/api/v1/businesses/:businessId/reviews/:reviewId', checkAuth, sorter.findBusinessAndReview, Reviews.deleteReview);
};
