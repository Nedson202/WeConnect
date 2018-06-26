import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Businesses = models.Business;
const Reviews = models.Review;
const Users = models.User;

/**
 *
 *@class
 *
 */
class sorter {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static findBusinessAndReview(req, res, next) {
    const { businessId, reviewId } = req.params;

    return Businesses.findById(businessId)
      .then((business) => {
        if (!business) {
          return errorMessage(res);
        }

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
            if (!review) {
              return res.status(404).json({
                message: 'Review not found'
              });
            }
            
            if (review.reviewer.username !== req.decoded.username && req.decoded.username !== 'admin') {
              return res.status(403).json({
                message: 'Operation forbidden, you have no access to modify this review'
              });
            }

            req.review = review;
            next();
          });
      })
      .catch(error => {
        return res.status(500).json({
        message: error.message,
        error: true
      })});
  }
}

export default sorter;
