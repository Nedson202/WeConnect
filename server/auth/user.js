import users from '../model/user';

/**
  *Represents user authentication
  *@class
*/
class Auth {
  /**
    *
    *Register user
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {json} response object gotten
    *@memberof Auth
  */
  static createUser(req, res) {
    const userId = users[users.length - 1].id + 1;
    const { username, email, password } = req.body;

    const filterUsername = users.filter(user => user.username === username)[0];
    const filterEmail = users.filter(user => email === user.email)[0];

    if (filterUsername || filterEmail) {
      res.status(400).json({
        message: 'username or email is taken',
        error: true
      });
    }

    if (!filterEmail && !filterUsername) {
      users.push({
        id: userId,
        username,
        email,
        password
      });
    }

    return res.status(201).json({
      message: 'Signup successful',
      error: 'false'
    });
  }

  /**
    *
    *Method responsible for logging in user
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {json} response object goten
    *@memberof Auth
  */
  static logUser(req, res) {
    const { username, password } = req.body;

    const filterUser = users.filter(user => user.username === username
      && password === user.password)[0];

    if (filterUser) {
      res.status(200).send({
        message: 'Login successful',
        error: false
      });
    }

    return res.status(401).json({
      message: 'Unathorised, check your username or password',
      error: true
    });
  }
}

export default Auth;
