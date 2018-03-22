import jwt from 'jsonwebtoken';
import config from '../config/config';

const checkAuth = (req, res) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      message: 'Invalid token or no token provided',
      help: 'Login to regenerate a token',
      error: true
    });
  }

  const decodeToken = jwt.verify(token, config.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Token is invalid',
        help: 'Login to generate a new one',
        error: true
      });
    }

    return decoded;
  });

  return decodeToken;
};

export default checkAuth;
