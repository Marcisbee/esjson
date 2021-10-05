/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateNot(value, currentSchema, position) {
	try {
		// Run full validation
		this.validateSchema.call(
			{...this, catch: true},
			value,
			position,
			currentSchema,
		);

		this.error("Value not accepted", "not", position);

		return;
	} catch (e) {
		return true;
	}
}

module.exports = validateNot;
