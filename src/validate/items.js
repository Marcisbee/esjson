/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} items
 * @param {(string | number)[]} position
 */
function validateItems(value, items, position) {
	for (const key in value) {
		this.validateSchema(value[key], position.concat(key), items);
	}
}

module.exports = validateItems;
