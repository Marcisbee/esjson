/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateIfThenElse(value, currentSchema, position) {
	let errorDepth = position.length + 1;
	let possibleError;

	try {
		// Run full validation
		this.validateSchema.call(
			{...this, catch: true},
			value,
			position,
			currentSchema,
		);

		return;
	} catch (e) {
		if (e.position && e.position.length > errorDepth) {
			possibleError = "if";
			errorDepth = e.position.length;
		}
	}

	// Guessing the error based on error depth
	if (possibleError) {
		return possibleError;
	}

	return true;
}

module.exports = validateIfThenElse;
