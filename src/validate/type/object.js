const validateRequired = require("../required");
const validateProperties = require("../properties");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateObject(value, currentSchema, position) {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		this.error('Incorrect type. Expected "object".', "type", position);
		return;
	}

	if (!this.shallow && currentSchema.required) {
		validateRequired.call(this, value, currentSchema.required, position);
	}

	if (currentSchema.properties) {
		validateProperties.call(this, value, currentSchema, position);
	}
}

module.exports = validateObject;
