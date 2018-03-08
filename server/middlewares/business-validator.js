/**
  *
  *Business validator
  *@class
  *
*/
class validateBusiness {
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

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).json({
        message: errors[0].msg,
        error: true
      });
    }

    next();
  }
}

export default validateBusiness;
