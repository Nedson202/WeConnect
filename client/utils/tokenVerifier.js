import jwt from 'jsonwebtoken';

const decodeToken = token => jwt.verify(token, process.env.JWT_SECRET, (err) => {
  if (err) return err;

  return false;
});

export default decodeToken;
