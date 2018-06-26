import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Businesses = models.Business;

/**
 *
 *@class
 *
 */
class reviewerValidator {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static checkReviewer(req, res, next) {
    const { businessId } = req.params;

    return Businesses.findById(parseInt(businessId, 10))
      .then((business) => {
        if (business === null) {
          return errorMessage(res);
        }

        if (business.userId === req.decoded.userId) {
          return res.status(403).json(['Owner of a business can not post a review']);
        }
    
        if (req.decoded.username === 'admin') {
          return res.status(403).json(['An admin can not post a review']);
        }

        next();
      }).catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
}

export default reviewerValidator;
