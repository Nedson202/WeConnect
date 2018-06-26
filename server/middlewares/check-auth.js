import jwt from 'jsonwebtoken';
import config from '../config/config';

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader) {
    token = authHeader.split(' ')[1];
  } else {
    return res.status(403).json(["Unable to complete your request, you're not logged in."]);
  }

  jwt.verify(token, config.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json(["Unable to complete your request, you're not logged in."]);
    }

    req.decoded = decoded;
    next();
  });
};

export default checkAuth;
