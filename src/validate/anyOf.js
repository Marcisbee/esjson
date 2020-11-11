/**
 * @this {import('src').Context}
 * @param {*} value
 * @param {*[]} currentSchema
 * @param {(string | number)[]} position
 */
function validateAnyOf(value, currentSchema, position) {
  for (const key in currentSchema) {
    if (!Object.prototype.hasOwnProperty.call(currentSchema, key)) {
      continue;
    }

    try {
      // Run shallow validation
      this.validateSchema.call({...this, shallow: true}, value, position, currentSchema[key]);

      return key;
    } catch (_) {
      // Silent fail
    }
  }

  this.error('Value doesn\'t match any of criteria', 'anyOf', position);
}

module.exports = validateAnyOf;
