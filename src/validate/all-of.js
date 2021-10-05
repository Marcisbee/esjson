/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*[]} currentSchema
 * @param {(string | number)[]} position
 */
function validateAllOf(value, currentSchema, position) {
	let errorDepth = position.length + 1;
	let possibleError;

	const passSize = currentSchema.length;
	let passedValues = 0;

	for (const key in currentSchema) {
		try {
			// Run full validation
			this.validateSchema.call(
				{...this, catch: true},
				value,
				position,
				currentSchema[key],
			);

			passedValues += 1;
		} catch (e) {
			if (e.position && e.position.length > errorDepth) {
				possibleError = key;
				errorDepth = e.position.length;
			}
		}
	}

	if (passedValues >= passSize) {
		return;
	}

	// Guessing the error based on error depth
	if (possibleError) {
		return possibleError;
	}

	this.error("Value doesn't match all of criteria", "allOf", position);
}

module.exports = validateAllOf;
