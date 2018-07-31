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
    req.check('email', 'Email cannot be empty or invalid').isEmail().normalizeEmail();
    req
      .check('password', 'Minimun password length is 6 characters')
      .isLength({ min: 6 }).trim();
    req.sanitizeBody('username').trim();
    // req.sanitizeBody('email').normalizeEmail();

    next();
  }
  /**
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
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next
    *@return {status} validator
  */
  static userUpdate(req, res, next) {
    req.check('username', 'Username is required').notEmpty();
    req.check('email', 'Email cannot be empty or invalid').isEmail();
    req.sanitizeBody('username').trim();
    req.sanitizeBody('email').trim();

    next();
  }
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@param {any} next - next value
    *@return {status} validator
  */
  static registerBusiness(req, res, next) {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email cannot be empty or invalid').isEmail().trim();
    req.check('address', 'Address is required').notEmpty().trim();
    req.check('location', 'Location is required').notEmpty().trim();
    req.check('category', 'Category is required').notEmpty().trim();
    req
      .check('description', 'Length of description must be bewtween 30-250 characters')
      .isLength({ min: 30, max: 250 }).trim();

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
    req.check('message', 'Review cannot be more than 250 characters').isLength({ min: 1, max: 250 }).trim();
    req.check('rating', 'Please rate this business').isFloat({ min: 1 });
    req.sanitizeBody('message').trim();

    next();
  }
  /**
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
