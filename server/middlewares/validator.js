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
    req.check('email', 'email is not valid').isEmail().trim();
    req
      .check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 }).trim();
    req.sanitizeBody('username').trim();
    req.sanitizeBody('email').trim();

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
    req.check('username', 'Username is required').notEmpty().trim();
    req.check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 }).trim();
    req.sanitizeBody('username').trim();


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
    req.check('name', 'name is required').notEmpty().trim();
    req.check('email', 'email is not valid, format--yourname@example.com').isEmail().trim();
    req
      .check('address', 'address is required')
      .isLength({ min: 1 }).trim();
    req.check('location', 'location is required e.g lagos').notEmpty().trim();
    req.check('category', 'category is required e.g mobile').notEmpty().trim();

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
    req.check('message', 'message is required').notEmpty().trim();

    next();
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next - next value
    *@return {status} validator
  */
  static checkParams(req, res, next) {
    req.checkParams('userId', 'Id in params can only be an integer').isInt().trim();

    next();
  }
  /**
    *
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next - next value
    *@return {status} validator
  */
  static checkQuery(req, res, next) {
    req.sanitizeQuery('location').trim();
    req.sanitizeQuery('category').trim();

    next();
  }
}

export default validator;
