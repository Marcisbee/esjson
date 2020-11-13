const jsonPointer = require("../json-pointer");

/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} currentSchema
 * @param {(string | number)[]} position
 */
function validateRef(value, currentSchema, position) {
	const match = currentSchema.$ref.match(/^#\/(.*)$/);
	if (match && match[1]) {
		const schema = jsonPointer(this.schema, match[1].split("/"));
		this.validateSchema(value, position, schema);
		return;
	}
}

module.exports = validateRef;
