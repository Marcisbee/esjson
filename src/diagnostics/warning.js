class Warning extends Error {
	/**
   * @param {string} message
   * @param {string} code
   * @param {(string | number)[]} position
   * @param {number=} lineNo
   * @param {string=} path
   */
	constructor(message, code, position, path, lineNo = null) {
		super(message);
		this.code = code;
		this.position = position;
		this.path = path;
		this.lineNo = lineNo;
	}
}

module.exports = Warning;
