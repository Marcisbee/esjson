class ValidationError {
	/**
   * @param {string} message
   * @param {string} code
   * @param {(string | number)[]=} position
   * @param {string=} filePath
   */
	constructor(message, code, position = [], filePath = null) {
		this.message = message;
		this.position = position;
		this.code = code;
		this.path = filePath;
	}
}

module.exports = ValidationError;