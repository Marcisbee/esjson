const validateEnum = require("../enum");

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
}

module.exports = validateString;
