/**
  *
  *@class validateUsers
  *
*/
class validateUsers {
  static userSignup (req, res, next) {
    const { username, email, password } = req.body;

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
}

export default validateUsers;
