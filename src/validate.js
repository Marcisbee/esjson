const ValidationError = require("./diagnostics/validation-error");
const Warning = require("./diagnostics/warning");
const isInRuleset = require("./utils/is-in-ruleset");
const validateSchema = require("./validate/schema");
const parseJSON = require("./parser");

/**
 * @param {string} filePath
 * @param {string} fileContents
 * @param {*} schema
 * @param {Record<string, any>} config
 * @param {(string | number)[]} position
 */
function validate(filePath, fileContents, schema, config, position = []) {
	// const json = JSON.parse(fileContents);
	const json = parseJSON(fileContents);
	const isEmpty =
		!fileContents.trim() || (json && Object.keys(json).length === 0);

	if (filePath && isEmpty) {
		const allowedToBeEmpty = isInRuleset(filePath, config.empty || []);
		if (allowedToBeEmpty) {
			return;
		}
	}

	/** @type {import("src").Context}*/
	const context = {
		validateSchema,
		filePath,
		schema,
		config,
		errors: [],
		error(message, code, pos, ref, lineNo) {
			if (
				ref &&
				this.config.allow &&
				this.config.allow[code] &&
				((ref.definition && this.config.allow[code][ref.key] === ref.definition) ||
				this.config.allow[code][ref.key] === true)
			) {
				const warning = new Warning(message, code, pos, undefined, lineNo);

				if (this.shallow || this.catch) {
					throw warning;
				}

				context.errors.push(warning);

				return warning;
			}

			const error = new ValidationError(message, code, pos, undefined, lineNo);

			if (this.shallow || this.catch) {
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
