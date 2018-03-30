import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Reviews = models.Review;
const Businesses = models.Business;
/**
  *
  *@class
  *
*/
class businessReviews {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static postReview(req, res) {
    const [message, businessId] = [req.body.message, req.params.businessId];

    return Businesses.findById(businessId)
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        if (business.userId === req.decoded.userId) {
          return res.status(403).json({
            message: 'Owner of a business can not post a review',
            error: true
          });
        }

        Reviews.create({
          reviewer: req.decoded.username,
          message,
          businessId
        })
          .then(review => res.status(201).json({
            message: 'Review posted successfully',
            error: false,
            review
          }));
      }).catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static getReview(req, res) {
    const { businessId } = req.params;

    return Businesses.findById(businessId)
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        Reviews.findAll({
          where: {
            businessId
          }
        })
          .then((reviews) => {
            if (reviews.length < 1) {
              return res.status(404).json({
                message: 'No reviews yet',
                error: false
              });
            }

            return res.status(200).json({
              reviews,
              error: false
            });
          });
      }).catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
}

export default businessReviews;
