import jwt from 'jsonwebtoken';

const decodeToken = (token) => {
  return jwt.verify(token, 'aledna', (err) => {
    if (err) {
      return err
    }

    return false
  });
}

export default decodeToken;
