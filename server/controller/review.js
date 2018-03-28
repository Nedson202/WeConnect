import models from '../models/index';
import errorMessage from '../middlewares/error-message';
import checkAuth from '../middlewares/check-auth';

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

    checkAuth(req, res);

    return Businesses.findById(businessId)
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        Reviews.create({
          reviewer: checkAuth(req, res).username,
          message,
          businessId
        })
          .then(() => res.status(201).json({
            message: 'Review posted successfully',
            error: false
          }));
      });
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
      });
  }
}

export default businessReviews;
