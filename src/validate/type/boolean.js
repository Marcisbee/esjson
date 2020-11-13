const validateEnum = require("../enum");

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
}

module.exports = validateBoolean;
