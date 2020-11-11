class Warning extends Error {
  /**
   * @param {string} message
   * @param {(string | number)[]} position
   * @param {string=} path
   */
  constructor(message, position, path) {
    super(message);
    this.position = position;
    this.path = path;
  }
}

module.exports = Warning;
