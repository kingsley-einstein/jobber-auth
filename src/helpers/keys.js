export default class Keys {
  /**
   *
   * @param {object} obj
   * @param {string[]} keys
   */
  static arePresent(obj, keys) {
    return Object.keys(obj).every((key) => keys.some((k) => k === key));
  }
}
