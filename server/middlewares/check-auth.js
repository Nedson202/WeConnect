import jwt from 'jsonwebtoken';
import config from '../config/config';
// middleware to check the validity of provided token
const checkAuth = (req, res, next) => {
  // collect the token provided in headers
  const authHeader = req.headers.authorization;
  let token;
  // split the token if any and remove 'bearer'
  if (authHeader) {
    [token] = [authHeader.split(' ')[1]];
  } else {
    // error message to return if no token is provided
    return res.status(403).json(["Unable to complete your request, you're not logged in."]);
  }
  // verify the token with the secret key used in signing the token
  jwt.verify(token, config.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json(["Unable to complete your request, you're not logged in."]);
    }
    // set the decoded data to req so the next function can use it
    req.decoded = decoded;
    // this calls the next function in line
    next();
  });
};

export default checkAuth;
