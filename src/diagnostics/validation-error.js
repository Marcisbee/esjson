class ValidationError {
	/**
   * @param {string} message
   * @param {string} code
   * @param {(string | number)[]=} position
   * @param {number=} lineNo
   * @param {string=} filePath
   */
	constructor(message, code, position = [], filePath = null, lineNo = null) {
		this.message = message;
		this.position = position;
		this.code = code;
		this.path = filePath;
		this.lineNo = lineNo;
	}
}

module.exports = ValidationError;
