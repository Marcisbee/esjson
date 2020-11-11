/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*} items
 * @param {(string | number)[]} position
 */
function validateItems(value, items, position) {
  for (const key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      continue;
    }

    this.validateSchema(value[key], position.concat(key), items);
  }
}

module.exports = validateItems;
