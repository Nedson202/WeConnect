import models from '../models/index';
import errorMessage from '../middlewares/error-message';

const Businesses = models.Business;
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
  static sortQuery(req, res, next) {
    const { location, category, name } = req.query;

    if (location || category || name) {
      return Businesses.findAll({
        where: {
          $or: [
            {
              location
            },
            {
              category
            },
            {
              name
            }
          ]
        }
      })
        .then((businesses) => {
          if (businesses.length < 1) {
            return res.status(404).json({
              error: {
                message: 'Business not found',
                error: true
              }
            });
          }

          return res.status(200).json({
            businesses
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
  static checkBusiness(req, res, next) {
    const { businessId } = req.params;

    const { id, userId } = req.body;

    return Businesses.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return errorMessage(res);
        }

        if (id || userId) {
          return res.status(400).json({
            message: 'UserId and business id can not be updated',
            error: true
          });
        }
        next();
      })
      .catch(error => res.status(500).json({
        message: error.message,
        help: 'Only an integer is allowed',
        error: true
      }));
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof sorter
    *@return {json} response object gotten
  */
  static checkUser(req, res, next) {
    const userId = parseInt(req.params.userId, 10);

    return Users.findOne({
      where: {
        id: userId
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found',
            error: true
          });
        }

        if (req.decoded.username !== 'admin' && req.decoded.email !== 'admin@aladmin.com') {
          return res.status(403).json({
            message: 'Forbidden, you do not have access to view all users',
            error: true
          });
        }

        next();
      });
  }
}

export default sorter;
