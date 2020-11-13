const validateEnum = require("../enum");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateNull(value, currentSchema, position) {
	if (value !== null) {
		this.error(`"${value}" should be null`, "type", position);
		return;
	}

	if (currentSchema.enum) {
		validateEnum.call(this, value, currentSchema.enum, position);
	}
}

module.exports = validateNull;
