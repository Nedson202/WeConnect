import models from '../models/index';
import checkAuth from '../middlewares/check-auth';
import errorMessage from '../middlewares/error-message';

const Businesses = models.Business;

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
  static sortQuery(req, res, next) {
    const { location, category } = req.query;

    if (location || category) {
      Businesses.findAll({
        where: {
          $or: [
            {
              location: {
                ilike: `%${location}%`
              }
            },
            {
              category: {
                ilike: `%${category}%`
              }
            }
          ]
        }
      })
        .then((business) => {
          if (business.length < 1) {
            return res.status(404).json({
              message: 'Business not found',
              error: true
            });
          }

          return res.status(200).json({
            business,
            error: false
          });
        });
    }

    next();
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static filterBusiness(req, res, next) {
    const businessId = parseInt(req.params.businessId, 10);

    checkAuth(req, res);

    Businesses.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return errorMessage(res);
        }

        if (business.userId !== checkAuth(req, res).userId) {
          return res.status(403).json({
            message: 'Forbidden, you do not have access to modify this business',
            error: true
          });
        }
        next();
      });
  }
}

export default sorter;
