import models from '../models';
import errorMessage from './error-message';
import config from '../config/config';

const Businesses = models.Business;
const Reviews = models.Review;
const Users = models.User;
/**
 *@class
 */
class sorter {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static findBusinessAndReview(req, res, next) {
    const { businessId, reviewId } = req.params;
    const { username } = req.decoded;
    // find a business and a review posted under that business
    return Businesses.findById(businessId)
      .then((business) => {
        if (!business) {
          return errorMessage(res);
        }
        // find one review posted
        return Reviews.findOne({
          where: {
            id: reviewId
          },
          include: [{
            model: Users,
            as: 'reviewer',
            attributes: ['username']
          }]
        })
          .then((review) => {
            // return not found message if review is not found
            if (!review) {
              return res.status(404).json({
                message: 'Review not found'
              });
            }
            // return error message if the user did not post the review or not an admin
            if (review.reviewer.username !== username && username !== config.admin) {
              return res.status(403).json({
                message: 'Operation forbidden, you have no access to modify this review'
              });
            }
            // set the review gotten to req so that the next function can access it
            req.review = review;
            // this calls the next function as this is a middleware
            next();
          });
      })
      // return any unhandled error
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
}

export default sorter;
