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
    const { username, email } = req.body;
    let { password } = req.body;

    if (typeof (password) === 'number') {
      password = password.toString();
    }

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

        const token = jwt.sign(
          {
            userId: user.id,
            username,
            email: user.email
          },
          config.secretkey
        );

        return res.status(201).json({
          message: 'Signup successful',
          error: false,
          user: {
            username: user.username,
            email: user.email
          },
          token
        });
      }).catch(error => res.status(409).json([error.errors[0].message]));
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
    let { password } = req.body;

    if (typeof (password) === 'number') {
      password = password.toString();
    }

    Users.findOne({
      where: {
        username: username.toLowerCase()
      }
    })
      .then((user) => {
        if (!(user && bcrypt.compareSync((password).toLowerCase(), user.password))) {
          return res.status(401).json([
            'Unauthorised, check your username or password'
          ]);
        }

        const token = jwt.sign(
          {
            userId: user.id,
            username,
            email: user.email
          },
          config.secretkey
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
    const userArray = [];

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

        users.forEach((user) => {
          userArray.push({
            id: user.id,
            username: user.username
          });
        });

        return res.status(200).json({ userArray });
      });
  }
  /**
      *
      *@param {any} req - request value
      *@param {any} res - response value
      *@return {json} response object goten
      *@memberof Auth
    */
  static updateUser(req, res) {
    const user = req.user;
    // const userId = parseInt(req.params.userId, 10);
    const conflict = [];

    user.update({
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      image: req.body.image || user.image
    })
      .then(() => {
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
            email: user.email,
            image: user.image
          },
          config.secretkey
        );

        return res.status(200).json({
          message: 'profile updated successfully',
          user: {
            username: user.username,
            email: user.email,
            image: user.image
          },
          token,
          error: false,
        });
      })
      .catch((error) => {
        if (error.errors[0].path === 'username') {
          conflict.push('user with name is already registered');
        }
        if (error.errors[0].path === 'email') {
          conflict.push('user with email is already registered');
        }

        return res.status(409).json(conflict);
      });
  }
  /**
      *
      *@param {any} req - request value
      *@param {any} res - response value
      *@return {json} response object goten
      *@memberof Auth
    */
  static deleteUser(req, res) {
    const userId = parseInt(req.params.userId, 10);

    if (req.decoded.userId === userId) {
      return res.status(400).json({
        message: 'you cannot delete yourself'
      });
    }

    return Users.destroy({
      where: {
        id: userId
      }
    })
      .then(() => res.status(200).json({
        message: 'User deleted successfully',
        error: false
      }));
  }
}

export default Auth;
