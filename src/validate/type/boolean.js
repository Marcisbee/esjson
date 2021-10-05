const validateEnum = require("../enum");
const validateNot = require("../not");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateBoolean(value, currentSchema, position) {
	if (typeof value !== "boolean") {
		this.error(`"${value}" should be boolean`, "type", position);
		return;
	}

	if (currentSchema.enum) {
		validateEnum.call(this, value, currentSchema.enum, position);
	}

	if (currentSchema.not) {
		validateNot.call(this, value, currentSchema.not, position);
	}
}

module.exports = validateBoolean;
