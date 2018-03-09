/**
  *Represents user input validation
  *@class
*/
class validateReviews {
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

export default validateReviews;
