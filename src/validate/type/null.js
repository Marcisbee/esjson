const validateEnum = require("../enum");
const validateNot = require("../not");

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

	if (currentSchema.not) {
		validateNot.call(this, value, currentSchema.not, position);
	}
}

module.exports = validateNull;
