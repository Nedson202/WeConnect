/**
  *@class
*/
class validator {
  /**
    *@param {any} req - resquest value
    *@param {any} res - response value
    *@param {any} next - next value
    *@return {status} validator
  */
  static userSignup(req, res, next) {
    req.check('username', 'Username is required').notEmpty();
    req.check('email', 'email is not valid').isEmail();
    req
      .check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 });

    next();
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@return {status} validator
  */
  static userLogin(req, res, next) {
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 });

    next();
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next - next value
    *@return {status} validator
  */
  static registerBusiness(req, res, next) {
    req.check('name', 'name is required').notEmpty();
    req.check('email', 'email is not valid, format--yourname@example.com').isEmail();
    req
      .check('address', 'address is required')
      .isLength({ min: 1 }).trim();
    req.check('location', 'location is required e.g lagos').notEmpty();
    req.check('category', 'category is required e.g mobile').notEmpty();

    next();
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next - next value
    *@return {status} validator
  */
  static reviews(req, res, next) {
    req.check('message', 'message is required').isLength({ min: 1 });

    next();
  }
}

export default validator;
