const ValidationError = require('./diagnostics/error');
const validateSchema = require('./validate/schema');

/**
 * @param {string} filePath
 * @param {string} fileContents
 * @param {*} schema
 * @param {(string | number)[]} position
 */
function validate(filePath, fileContents, schema, position = []) {
  const json = JSON.parse(fileContents);
  /** @type {import("src").Context} */
  const context = {
    validateSchema,
    filePath,
    schema,
    errors: [],
    error(message, code, pos) {
      const error = new ValidationError(message, code, pos);

      if (this.shallow) {
        throw error;
      }

      context.errors.push(error);

      return error;
    }
  };

  validateSchema.call(context, json, position, schema);

  if (context.errors.length > 0) {
    throw context.errors;
  }
}

module.exports = validate;
