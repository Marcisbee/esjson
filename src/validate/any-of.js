/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*[]} currentSchema
 * @param {(string | number)[]} position
 */
function validateAnyOf(value, currentSchema, position) {
	let errorDepth = position.length + 1;
	let possibleError;

	for (const key in currentSchema) {
		try {
			// Run shallow validation
			this.validateSchema.call(
				{...this, shallow: true},
				value,
				position,
				currentSchema[key],
			);

			return key;
		} catch (e) {
			if (e.position && e.position.length > errorDepth) {
				possibleError = key;
				errorDepth = e.position.length;
			}
		}
	}

	// Guessing the error based on error depth
	if (possibleError) {
		return possibleError;
	}

	this.error("Value doesn't match any of criteria", "anyOf", position);
}

module.exports = validateAnyOf;
