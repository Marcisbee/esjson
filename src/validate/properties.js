/**
 * @this {import('src').Context}
 * @param {*} object
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateProperties(object, currentSchema, position) {
	for (const key in object) {
		if (!Object.prototype.hasOwnProperty.call(object, key)) {
			continue;
		}

		const properties = currentSchema.properties[key];
		if (properties === undefined) {
			if (!this.shallow && !currentSchema.additionalProperties) {
				this.error(
					`Property "${key}" is not allowed`,
					"additionalProperties",
					position,
					{
						key,
						definition: currentSchema.title,
					},
				);
			}

			continue;
		}

		this.validateSchema(object[key], position.concat(key), properties);
	}
}

module.exports = validateProperties;
