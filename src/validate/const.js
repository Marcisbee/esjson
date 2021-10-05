/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateConst(value, currentSchema, position) {
	if (value === currentSchema) {
		return true;
	}

	this.error(
		`Value "${value}" not accepted. Expected value: ${currentSchema}`,
		"const",
		position,
	);
}

module.exports = validateConst;
