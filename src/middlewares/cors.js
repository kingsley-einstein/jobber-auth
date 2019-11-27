export default class Cors {
  /**
   *
   * @param {string} origin
   * @param {string} methods
   * @param {string} headers
   */
  static corsify(origin, methods, headers) {
    return async (req, res, next) => {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', headers);
      res.header('Access-Control-Allow-Methods', methods);
      next();
    };
  }
}
