import models from '../models/index';

const Users = models.User;

/**
 *
 *@class
 *
 */
class validateUser {
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@memberof validateUser
    *@return {json} response object gotten
  */
  static checkUserValidity(req, res, next) {
    const userId = parseInt(req.params.userId, 10);

    return Users.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'user not found',
          error: true
        });
      }

      if (user.id !== req.decoded.userId) {
        res.status(403).json({
          message: 'Forbidden, access denied',
          error: true
        });
      }

      req.user = user;
      next();
    }).catch(error => {
        return res.status(500).json({
        message: error.message,
        help: 'Only an integer is allowed',
        error: true
      })});
  }
}

export default validateUser;
