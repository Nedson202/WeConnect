import express from 'express';
import users from '../dummy-data/users';

const userRoute = express.Router();

userRoute.get('/', (req, res) => {
  res.send('Welcome to WeConnect');
});

userRoute.get('/users', (req, res) => {
  res.status(200).send(users);
});

userRoute.post('/auth/signup', (req, res) => {
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

  if (!errors) {
    users.push({
      id: users.length + 1,
      username,
      email,
      password
    });
  }

  return res.status(200).json({
    message: 'Signup successful'
  });
});

userRoute.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  req.check('username', 'Username is required').notEmpty();
  req
    .check('password', 'minimun password length is 5 chars')
    .isLength({ min: 5 });

  const user = users.filter(user => user.username === username && password === user.password)[0];

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      message: errors[0].msg,
      error: true
    });
  }

  if (user) {
    res.status(200).send({
      message: 'Login successful'
    });
  }

  return res.status(401).json({
    message: 'Unathorised, check your username or password',
    error: true
  });
});

export default userRoute;
