class GenericError {
	/**
   * @param {string} message
   * @param {(string | number)[]=} position
   * @param {string=} filePath
   */
	constructor(message, position = [], filePath = null) {
		this.message = message;
		this.position = position;
		this.path = filePath;
	}
}

module.exports = GenericError;
