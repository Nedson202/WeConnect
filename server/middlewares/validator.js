/**
  *Represents user input validation
  *@class
*/
class validator {
  /**
    *
    *Validates user input during signup
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@param {any} next - next value - this is a middleware reserved keyword
    responsible for allowing other methods or action in line to act only after this pressent
    action has taken place
    *@return {json} response object gotten
    *@memberof validator
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
    *Validates user input during login
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@param {any} next - next value - this is a middleware reserved keyword
    responsible for allowing other methods or action in line to act only after this pressent
    action has taken place
    *@return {json} response object gotten
    *@memberof validator
  */
  static userLogin(req, res, next) {
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 });

    next();
  }
  /**
    *
    *Register business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@param {any} next - next value - this is a middleware reserved keyword
    responsible for allowing other methods or action in line to act only after this pressent
    action has taken place
    *@return {json} response object gotten
    *@memberof validateBusiness
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
    *Validates user input before posting a review
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@param {any} next - next value - this is a middleware reserved keyword
    responsible for allowing other methods or action in line to act only after this pressent
    action has taken place
    *@return {json} response object gotten
    *@memberof validateReviews
  */
  static reviews(req, res, next) {
    req.check('reviewer', 'reviewers name is required').isLength({ min: 1 });
    req.check('message', 'message is required').isLength({ min: 1 });

    next();
  }
}

export default validator;
