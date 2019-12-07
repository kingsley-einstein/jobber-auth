import jwt from 'jsonwebtoken';
import env from '../env';

const { jwtSecret } = env;

export default class Jwt {
  /**
   *
   * @param {string | {} | Buffer} payload
   */
  static tokenize(payload) {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: '7d'
    });
  }

  /**
   *
   * @param {string} token
   */
  static verify(token) {
    return jwt.verify(token, jwtSecret);
  }

  /**
   *
   * @param {string} token
   */
  static decode(token) {
    return jwt.decode(token);
  }
}
