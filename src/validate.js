/* eslint-disable max-params */
const ValidationError = require("./diagnostics/error");
const Warning = require("./diagnostics/warning");
const validateSchema = require("./validate/schema");

/**
 * @param {string} filePath
 * @param {string} fileContents
 * @param {*} schema
 * @param {Record<string, any>} config
 * @param {(string | number)[]} position
 */
function validate(filePath, fileContents, schema, config, position = []) {
	const json = JSON.parse(fileContents);
	/** @type {import("src").Context}*/
	const context = {
		validateSchema,
		filePath,
		schema,
		config,
		errors: [],
		error(message, code, pos, ref) {
			if (
				ref &&
				ref.definition &&
				this.config.allow &&
				this.config.allow[code] &&
				this.config.allow[code][ref.key] === ref.definition
			) {
				const warning = new Warning(message, code, pos);

				if (this.shallow) {
					throw warning;
				}

				context.errors.push(warning);

				return warning;
			}

			const error = new ValidationError(message, code, pos);

			if (this.shallow) {
				throw error;
			}

			context.errors.push(error);

			return error;
		},
	};

	validateSchema.call(context, json, position, schema);

	if (context.errors.length > 0) {
		throw context.errors;
	}
}

module.exports = validate;
