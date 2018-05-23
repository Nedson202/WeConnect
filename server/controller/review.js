import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Reviews = models.Review;
const Businesses = models.Business;
const Users = models.User;
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

    return Businesses.findById(parseInt(businessId))
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        if (business.userId === req.decoded.userId) {
          return res.status(403).json({
            message: 'Owner of a business can not post a review',
          });
        }

        if (req.decoded.username === 'admin') {
          return res.status(403).json({
            message: 'An admin can not post a review',
          });
        }

        Reviews.create({
          userId: req.decoded.userId,
          message,
          businessId
        })
          .then(postedReview => res.status(201).json({
            message: 'Review posted successfully',
            error: false,
            review: {
              id: postedReview.id,
              message: postedReview.message,
              createdAt: postedReview.createdAt,
              reviewer: {
                username: req.decoded.username
              }
            }
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
          },
          order: [
            ['updatedAt', 'DESC']
          ],
          include: [{
            model: Users,
            as: 'reviewer',
            attributes: ['username', 'image']            
          }]
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
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {status} response object gotten
    *@memberof businessReviews
  */
  static deleteReview(req, res) {
    const { reviewId } = req.params;
    
    return Reviews.destroy({
      where: {
        id: reviewId
      }
    }).then(() => res.status(200).json({
      message: 'Review deleted successfully'
    }));
  }
}

export default businessReviews;
