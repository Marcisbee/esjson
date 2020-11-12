/**
 * @this {import('src').Context}
 * @param {*} object
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateRequired(object, currentSchema, position) {
	for (const key of currentSchema) {
		if (object[key] === undefined) {
			this.error(
				`Missing required key "${key}"`,
				"required",
				position,
				{
					key,
					definition: currentSchema.title,
				},
			);
			return;
		}
	}
}

module.exports = validateRequired;
