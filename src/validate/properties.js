const getLineNumber = require('../utils/get-line-number');

/**
 * @this {import('src').Context}
 * @param {*} object
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateProperties(object, currentSchema, position) {
	for (const key in object) {
		const property = currentSchema.properties[key];
		if (property === undefined) {
			if (
				!this.shallow &&
				!currentSchema.additionalProperties &&
				currentSchema.additionalProperties !== undefined
			) {
				this.error(
					`Property "${key}" is not allowed`,
					"additionalProperties",
					position,
					{
						key,
						definition: currentSchema.title,
					},
					getLineNumber(object, key),
				);
			}

			if (typeof currentSchema.additionalProperties === "object") {
				this.validateSchema(
					object[key],
					position.concat(key),
					currentSchema.additionalProperties,
				);
				continue;
			}

			continue;
		}

		this.validateSchema(object[key], position.concat(key), property);
	}
}

module.exports = validateProperties;
