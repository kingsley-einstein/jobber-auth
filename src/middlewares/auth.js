import db from '../db';
import helpers from '../helpers';

const {
  models: {
    User,
    Token
  }
} = db;

const { Jwt, Keys } = helpers;

export default class Auth {
  /**
    *
    * @param {Request} req
    * @param {Response} res
    * @param {*} next
    */
  static async checkIfBodyHasKeys(req, res, next) {
    try {
      if (!Keys.arePresent(req.body, ['email', 'password'])) {
        res.status(400).json({
          statusCode: 400,
          body: 'Missing necessary keys'
        });
        return;
      }
      next();
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
   * @param {*} next
   */
  static async checkIfUserExists(req, res, next) {
    try {
      const user = await User.findByEmail(req.body.email);
      if (user) {
        res.status(400).json({
          statusCode: 400,
          body: `Email ${req.body.email} already in use`
        });
        return;
      }
      next();
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
   * @param {*} next
   */
  static async verifyUser(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401).json({
          statusCode: 401,
          body: 'Authorization header not present in request'
        });
        return;
      }
      if (!authorization.startsWith('Bearer')) {
        res.status(401).json({
          statusCode: 401,
          body: 'Authorization header must begin with "Bearer"'
        });
        return;
      }
      const token = authorization.substring(7, authorization.length);
      if (!token) {
        res.status(401).json({
          statusCode: 401,
          body: 'Token not present in authorization header'
        });
        return;
      }
      const payload = Jwt.decode(token);
      if (!payload) {
        res.status(401).json({
          statusCode: 401,
          body: 'Session expired. Login again'
        });
        return;
      }
      const isLoggedOut = await Token.findByToken(token);
      if (isLoggedOut) {
        res.status(401).json({
          statusCode: 401,
          body: 'Only signed in users can access this resource'
        });
        return;
      }
      const user = await User.findByPk(payload.id);
      if (!user) {
        res.status(401).json({
          statusCode: 401,
          body: 'Unable to authenticate'
        });
        return;
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
