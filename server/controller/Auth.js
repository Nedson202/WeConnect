import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import config from '../config/config';

const Users = models.User;
/**
 *Represents user authentication
 *@class
 */
class Auth {
  /**
      *
      *@param {any} req - request value
      *@param {any} res - response value
      *@return {json} response object gotten
      *@memberof Auth
    */
  static createUser(req, res) {
    const { username, email, password } = req.body;

    Users.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password.toLowerCase()
    })
      .then((user) => {
        const passwordHash = bcrypt.hashSync(user.password, 10);
        user.update({
          password: passwordHash
        });
        return res.status(201).json({
          message: 'Signup successful',
          error: false,
          user
        });
      }).catch(error => res.status(409).json({
        message: error.message,
        error: true
      }));
  }

  /**
      *
      *@param {any} req - request value
      *@param {any} res - response value
      *@return {json} response object goten
      *@memberof Auth
    */
  static logUser(req, res) {
    const { username } = req.body;

    Users.findOne({
      where: {
        username: username.toLowerCase()
      }
    })
      .then((user) => {
        if (!(user && bcrypt.compareSync((req.body.password).toLowerCase(), user.password))) {
          return res.status(401).json({
            message: 'Unathorised, check your username or password',
            error: true
          });
        }

        const token = jwt.sign(
          {
            userId: user.id,
            username,
            email: user.email
          },
          config.secretkey,
          {
            expiresIn: '10h'
          }
        );

        return res.status(200).json({
          message: 'login successful',
          tokenMessage: 'Generated token expires in 10 hours time',
          error: false,
          token
        });
      });
  }
  /**
      *
      *@param {any} req - request value
      *@param {any} res - response value
      *@return {json} response object goten
      *@memberof Auth
    */
  static getAllUser(req, res) {
    return Users
      .findAll()
      .then((users) => {
        if (users.length === 0) {
          return res.status(404).json({
            message: 'No user registered yet'
          });
        }

        if (req.decoded.username !== 'admin' && req.decoded.email !== 'admin@aladmin.com') {
          return res.status(403).json({
            message: 'Forbidden, you do not have access to view all users',
            error: true
          });
        }

        return res.status(200).json({
          users,
          error: false
        });
      });
  }
}

export default Auth;
