const validateEnum = require("../enum");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateNumber(value, currentSchema, position) {
	if (typeof value !== "number") {
		this.error(`"${value}" should be number`, "type", position);
		return;
	}

	if (currentSchema.enum) {
		validateEnum.call(this, value, currentSchema.enum, position);
	}
}

module.exports = validateNumber;
