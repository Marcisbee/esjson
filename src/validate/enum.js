/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateEnum(value, currentSchema, position) {
	for (const key of currentSchema) {
		if (value === key) {
			return;
		}
	}

	this.error(
		`Value "${value}" not accepted. Valid values: ${currentSchema}`,
		"enum",
		position,
	);
}

module.exports = validateEnum;
