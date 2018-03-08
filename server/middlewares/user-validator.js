/**
  *Represents user input validation
  *@class
*/
class validateUsers {
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
    *@memberof validateUsers
  */
  static userSignup(req, res, next) {
    req.check('username', 'Username is required').notEmpty();
    req.check('email', 'email is not valid').isEmail();
    req
      .check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 });

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).json({
        message: errors[0].msg,
        error: true
      });
    }
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
    *@memberof validateUsers
  */
  static userLogin(req, res, next) {
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'minimun password length is 5 chars')
      .isLength({ min: 5 });

    const errors = req.validationErrors();

    if (errors) {
      res.status(401).json({
        message: errors[0].msg,
        error: true
      });
    }

    next();
  }
}

export default validateUsers;
