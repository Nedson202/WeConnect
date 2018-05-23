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
    req.check('email', 'Email is not valid').isEmail().trim();
    req
      .check('password', 'Minimun password length is 5 chars')
      .isLength({ min: 6 }).trim();
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
    req.check('username', 'Username is required').notEmpty();
    req
      .check('password', 'Minimun password length is 6 chars')
      .isLength({ min: 6 }).trim();
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
    req.check('name', 'This is required').notEmpty();
    req.check('email', 'Email is not valid').isEmail().trim();
    req.check('address', 'This field is required').notEmpty().trim();
    req.check('location', 'This field is required').notEmpty().trim();
    req.check('category', 'This field is required').notEmpty().trim();
    req
      .check('description', 'Minimum character length is 30')
      .isLength({ min: 30 }).trim();

    req.sanitizeBody('name').trim();
    req.sanitizeBody('email').trim();
    req.sanitizeBody('address').trim();
    req.sanitizeBody('location').trim();
    req.sanitizeBody('category').trim();
    req.sanitizeBody('description').trim();

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
    req.checkParams('businessId', 'Id in params can only be an integer').isInt().trim();
    req.check('message', 'This field is required').notEmpty();
    req.sanitizeBody('message').trim();

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
