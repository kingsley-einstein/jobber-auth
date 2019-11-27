import bcrypt from 'bcryptjs';
import db from '../db';
import helpers from '../helpers';

const {
  models: {
    User,
    Token
  }
} = db;

const { Jwt } = helpers;

export default class AuthController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const { body } = req;
      const user = await User.create(body);
      const data = {
        email: user.email,
        id: user.id,
        token: Jwt.tokenize({
          id: user.id,
          password: user.password
        })
      };
      res.status(201).json({
        statusCode: 201,
        body: data
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          body: 'User not found'
        });
        return;
      }
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({
          statusCode: 400,
          body: 'Incorrect password'
        });
        return;
      }
      const body = {
        email: user.email,
        id: user.id,
        token: Jwt.tokenize({
          id: user.id,
          password: user.password
        })
      };
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async getLoggedUser(req, res) {
    try {
      const { user } = req;
      const data = {
        id: user.id,
        email: user.email
      };
      res.status(200).json({
        statusCode: 200,
        body: data
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async logOut(req, res) {
    try {
      const { user, token } = req;
      const log = await Token.create({ token });
      if (!log) {
        res.status(500).json({
          statusCode: 500,
          body: 'Cannot log user out'
        });
        return;
      }
      res.status(200).json({
        statusCode: 200,
        body: `Successfully logged out user with id ${user.id}`
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async update(req, res) {
    try {
      const { user, body } = req;
      const update = await User.update(body, {
        where: {
          id: user.id
        },
        individualHooks: true,
        returning: true
      });
      const data = update[1][0];
      res.status(200).json({
        statusCode: 200,
        body: `Successfully updated user with id ${data.id}`
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
