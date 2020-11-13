const validateItems = require("../items");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateArray(value, currentSchema, position) {
	if (!Array.isArray(value)) {
		this.error('Incorrect type. Expected "array".', "type", position);
		return;
	}

	if (!this.shallow && currentSchema.items) {
		validateItems.call(this, value, currentSchema.items, position);
	}
}

module.exports = validateArray;
