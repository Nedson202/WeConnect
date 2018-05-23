import jwt from 'jsonwebtoken';
import config from '../config/config';

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader) {
    token = authHeader.split(' ')[1];
  } else {
    return res.status(403).json({
      message: "Unable to complete your request, you're not logged in.",
      help: 'Login to regenerate a token',
      error: true
    });
  }

  jwt.verify(token, config.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Token is invalid, login again to continue',
        message1: "Unable to complete your request, you're not logged in.",
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
