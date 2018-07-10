import models from '../models';

const Users = models.User;
/**
 *@class
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
    // find user by id provided
    return Users.findById(userId).then((user) => {
      // return error message if review is not found
      if (!user) {
        return res.status(404).json({
          message: 'user not found',
          error: true
        });
      }
      // return error if user is unauthorized
      if (user.id !== req.decoded.userId) {
        res.status(403).json({
          message: 'Forbidden, access denied',
          error: true
        });
      }
      // pass user information to the next function
      req.user = user;
      // this calls the next function as this is a middleware
      next();
    }).catch(error => res.status(500).json({
      message: error.message,
      help: 'Only an integer is allowed',
      error: true
    }));
  }
}

export default validateUser;
