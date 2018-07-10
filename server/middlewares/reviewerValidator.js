import models from '../models';
import errorMessage from './error-message';
import config from '../config/config';

const Businesses = models.Business;
/**
 *@class
 */
class reviewerValidator {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static checkReviewer(req, res, next) {
    const { businessId } = req.params;
    const { username, userId } = req.decoded;
    // find a business by its id
    return Businesses.findById(parseInt(businessId, 10))
      .then((business) => {
        // return error message if no match is found
        if (business === null) {
          return errorMessage(res);
        }
        // disallow business owner from posting review
        if (business.userId === userId) {
          return res.status(403).json(['Owner of a business can not post a review']);
        }
        // disallow admin from posting review
        if (username === config.admin) {
          return res.status(403).json(['An admin can not post a review']);
        }
        // call the next function in line
        next();
      })
      // return error from server if any
      .catch(error => res.status(500).json({
        message: error.message,
        error: true
      }));
  }
}

export default reviewerValidator;
