import users from '../model/user';

/** @class representing user authentication */
class Auth {
  /**
    *
    *@param {any} req - The request value
    *@param {any} res - The response value
    *return {json}
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
}

export default Auth;
