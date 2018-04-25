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
    req.sanitizeBody('username').trim();
    req.sanitizeBody('email').trim();
    req.sanitizeBody('password').trim();

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
    req.sanitizeBody('username').trim();
    req.sanitizeBody('password').trim();

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
    req.sanitizeBody('name').trim();
    req.sanitizeBody('email').trim();
    req.sanitizeBody('address').trim();
    req.sanitizeBody('location').trim();
    req.sanitizeBody('category').trim();

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
