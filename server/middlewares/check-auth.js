import jwt from 'jsonwebtoken';
import config from '../config/config';

const checkAuth = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      message: 'Please provide a token',
      help: 'Login to regenerate a token',
      error: true
    });
  }

  jwt.verify(token, config.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Token is invalid',
        help: 'Login to generate a new one',
        error: true
      });
    }

    req.decoded = decoded;
    next();
  });

  // return decodeToken;
};

export default checkAuth;
