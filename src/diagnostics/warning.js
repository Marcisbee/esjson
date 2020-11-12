class Warning extends Error {
  /**
   * @param {string} message
   * @param {string} code
   * @param {(string | number)[]} position
   * @param {string=} path
   */
  constructor(message, code, position, path) {
    super(message);
    this.code = code;
    this.position = position;
    this.path = path;
  }
}

module.exports = Warning;
