const GenericError = require("../diagnostics/generic-error");

const validateEnum = require("./enum");
const validateAllOf = require("./all-of");
const validateAnyOf = require("./any-of");
const validateString = require("./type/string");
const validateObject = require("./type/object");
const validateNumber = require("./type/number");
const validateBoolean = require("./type/boolean");
const validateNull = require("./type/null");
const validateMultiple = require("./type/multiple");
const validateArray = require("./type/array");
const validateRef = require("./ref");

/**
 * @this {import('src').Context}
 * @param {*} json
 * @param {(string | number)[]} position
 * @param {*} currentSchema
 */
// @ts-ignore
function validateSchema(json, position, currentSchema = this.schema) {
	if (
		typeof currentSchema === "number" ||
		typeof currentSchema === "string" ||
		!currentSchema
	) {
		throw new GenericError("Invalid schema");
	}

	if (currentSchema.type === "array") {
		validateArray.call(this, json, currentSchema, position);
		return;
	}

	if (currentSchema.type === "object") {
		validateObject.call(this, json, currentSchema, position);
		return;
	}

	if (currentSchema.type === "string") {
		validateString.call(this, json, currentSchema, position);
		return;
	}

	if (currentSchema.type === "number" || currentSchema.type === "integer") {
		validateNumber.call(this, json, currentSchema, position);
		return;
	}

	if (currentSchema.type === "boolean") {
		validateBoolean.call(this, json, currentSchema, position);
		return;
	}

	if (currentSchema.type === "null") {
		validateNull.call(this, json, currentSchema, position);
		return;
	}

	if (Array.isArray(currentSchema.type)) {
		validateMultiple.call(this, json, currentSchema, position);
		return;
	}

	if (currentSchema.enum) {
		validateEnum.call(this, json, currentSchema.enum, position);
		return;
	}

	if (!this.shallow && currentSchema.allOf) {
		const key = validateAllOf.call(this, json, currentSchema.allOf, position);

		if (typeof key === "undefined") {
			return;
		}

		validateSchema.call(this, json, position, currentSchema.allOf[key]);
		return;
	}

	if (!this.shallow && currentSchema.anyOf) {
		const key = validateAnyOf.call(this, json, currentSchema.anyOf, position);

		if (typeof key === "undefined") {
			return;
		}

		validateSchema.call(this, json, position, currentSchema.anyOf[key]);
		return;
	}

	if (currentSchema.$ref) {
		validateRef.call(this, json, currentSchema, position);
		return;
	}

	if (Object.keys(currentSchema).length === 0) {
		return;
	}

	throw new GenericError(
		`Unhandled schema "${JSON.stringify(currentSchema)}" with value "${json}"`,
	);
}

module.exports = validateSchema;
