const validateEnum = require("../enum");
const validateNot = require("../not");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateString(value, currentSchema, position) {
	if (typeof value !== "string") {
		this.error(`"${value}" should be string`, "type", position);
		return;
	}

	if (currentSchema.enum) {
		validateEnum.call(this, value, currentSchema.enum, position);
	}

	if (currentSchema.not) {
		validateNot.call(this, value, currentSchema.not, position);
	}
}

module.exports = validateString;
